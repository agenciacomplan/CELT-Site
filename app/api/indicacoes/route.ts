import { getDb } from "../../../db";
import { indicacoes } from "../../../db/schema";

const SERIES = new Set([
  "Maternal 1", "Maternal 2", "Pré-escolar 1", "Pré-escolar 2",
  "1º ano", "2º ano", "3º ano", "4º ano", "5º ano", "6º ano",
]);

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
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
    const consentimento = body.consentimento === "sim";

    if (!responsavel || !whatsapp || !crianca || !indicador || !consentimento || !SERIES.has(serie) || !["Manhã", "Tarde"].includes(turno)) {
      return Response.json({ error: "Preencha todos os campos obrigatórios." }, { status: 400 });
    }

    const digits = whatsapp.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 13) {
      return Response.json({ error: "Informe um WhatsApp válido com DDD." }, { status: 400 });
    }

    const db = getDb();
    await db.insert(indicacoes).values({ responsavel, whatsapp, crianca, serie, turno, indicador, consentimento });
    return Response.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Falha ao registrar indicação", error);
    return Response.json({ error: "Não foi possível registrar a indicação." }, { status: 500 });
  }
}
