import { and, eq } from "drizzle-orm";
import { getDb } from "../../../db";
import { agendamentos, bloqueiosAgenda } from "../../../db/schema";

const SERIES = new Set(["Maternal 1", "Maternal 2", "Pré-escolar 1", "Pré-escolar 2", "1º ano", "2º ano", "3º ano", "4º ano", "5º ano", "6º ano"]);
const HORARIOS = new Set(Array.from({ length: 18 }, (_, index) => {
  const minutes = 8 * 60 + index * 30;
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
}));

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isWeekday(date: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
  const parsed = new Date(`${date}T12:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.getUTCDay() !== 0 && parsed.getUTCDay() !== 6;
}

function todayInSaoPaulo() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Sao_Paulo", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
}

async function syncWithGoogleSheets(payload: Record<string, unknown>) {
  const formResponseUrl = process.env.GOOGLE_FORM_RESPONSE_URL;
  if (!formResponseUrl) return false;

  try {
    const values = new URLSearchParams({
      "entry.2020059355": clean(payload.responsavel),
      "entry.679224422": clean(payload.whatsapp),
      "entry.1226183185": clean(payload.crianca),
      "entry.1219705941": clean(payload.serie),
      "entry.1490369695": clean(payload.turno),
      "entry.1127509795": clean(payload.indicador),
      "entry.2060762394": clean(payload.data),
      "entry.869447640": clean(payload.horario),
      "entry.162662694": "Confrimar",
    });

    const response = await fetch(formResponseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      body: values,
      redirect: "follow",
      signal: AbortSignal.timeout(8_000),
    });
    return response.ok;
  } catch (error) {
    console.error("Falha ao sincronizar agendamento com o Google Sheets", error);
    return false;
  }
}

export async function GET(request: Request) {
  try {
    const data = new URL(request.url).searchParams.get("data") ?? "";
    if (!isWeekday(data)) return Response.json({ indisponiveis: [...HORARIOS] });

    const db = getDb();
    const [reservados, bloqueados] = await Promise.all([
      db.select({ horario: agendamentos.horario }).from(agendamentos).where(and(eq(agendamentos.data, data), eq(agendamentos.status, "pendente"))),
      db.select({ horario: bloqueiosAgenda.horario }).from(bloqueiosAgenda).where(eq(bloqueiosAgenda.data, data)),
    ]);
    return Response.json({ indisponiveis: [...new Set([...reservados, ...bloqueados].map((item) => item.horario))] });
  } catch (error) {
    console.error("Falha ao consultar agenda", error);
    return Response.json({ error: "Não foi possível consultar a agenda." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as Record<string, unknown>;
    const responsavel = clean(body.responsavel);
    const whatsapp = clean(body.whatsapp);
    const crianca = clean(body.crianca);
    const serie = clean(body.serie);
    const turno = clean(body.turno);
    const indicador = clean(body.indicador);
    const data = clean(body.data);
    const horario = clean(body.horario);
    const consentimento = body.consentimento === "sim";

    if (!responsavel || !crianca || !indicador || !consentimento || !SERIES.has(serie) || !["Manhã", "Tarde"].includes(turno) || !isWeekday(data) || data <= todayInSaoPaulo() || !HORARIOS.has(horario)) {
      return Response.json({ error: "Confira os dados e escolha uma data e horário válidos." }, { status: 400 });
    }
    const digits = whatsapp.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 13) return Response.json({ error: "Informe um WhatsApp válido com DDD." }, { status: 400 });

    const db = getDb();
    const blocked = await db.select({ id: bloqueiosAgenda.id }).from(bloqueiosAgenda).where(and(eq(bloqueiosAgenda.data, data), eq(bloqueiosAgenda.horario, horario))).limit(1);
    if (blocked.length) return Response.json({ error: "Este horário não está mais disponível." }, { status: 409 });

    const [created] = await db.insert(agendamentos)
      .values({ responsavel, whatsapp, crianca, serie, turno, indicador, data, horario, consentimento })
      .returning({ id: agendamentos.id });

    const sincronizadoPlanilha = await syncWithGoogleSheets({ responsavel, whatsapp, crianca, serie, turno, indicador, data, horario });
    if (sincronizadoPlanilha && created) {
      await db.update(agendamentos)
        .set({ sincronizadoPlanilha: true })
        .where(eq(agendamentos.id, created.id));
    }

    return Response.json({ ok: true, sincronizadoPlanilha }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (message.includes("UNIQUE") || message.includes("unique")) return Response.json({ error: "Este horário acabou de ser reservado. Escolha outro." }, { status: 409 });
    console.error("Falha ao registrar agendamento", error);
    return Response.json({ error: "Não foi possível registrar o agendamento." }, { status: 500 });
  }
}
