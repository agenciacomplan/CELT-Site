const GOOGLE_FORM_RESPONSE_URL = process.env.BOLSAO_GOOGLE_FORM_RESPONSE_URL
  ?? "https://docs.google.com/forms/d/e/1FAIpQLSdMskMp1kTHnRASDavoxuKSZgmSfBZFj_LRoDT4HWDCt7hxtw/formResponse";

const entries = {
  responsavel: "entry.2058128614", celular: "entry.1141534757", email: "entry.722129672",
  profissao: "entry.1355676974", telefoneAdicional: "entry.323590317", cep: "entry.2116529110",
  aluno: "entry.113751249", estado: "entry.1578141385", serie: "entry.1877801884",
  primeiraEscola: "entry.155477251", escolaAtual: "entry.1750563209", consentimento: "entry.1509933467",
} as const;

const validStates = new Set(["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"]);
const validSeries = new Set(["1º ano", "2º ano", "3º ano", "4º ano", "5º ano", "6º ano"]);

function clean(value: unknown, maxLength = 180) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: Request) {
  if (!GOOGLE_FORM_RESPONSE_URL) return Response.json({ error: "O envio está temporariamente indisponível." }, { status: 503 });

  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return Response.json({ error: "Dados inválidos." }, { status: 400 }); }

  const responsavel = clean(body.responsavel);
  const celular = clean(body.celular, 30);
  const email = clean(body.email, 160).toLowerCase();
  const profissao = clean(body.profissao);
  const telefoneAdicional = clean(body["telefone-adicional"], 30);
  const cep = clean(body.cep, 20);
  const aluno = clean(body.aluno);
  const estado = clean(body.estado, 2).toUpperCase();
  const serie = clean(body.serie, 20);
  const escolaAtual = clean(body["escola-atual"]);
  const primeiraEscola = body.primeiraEscola === true;
  const consentimento = body.consentimento === true;
  const required = [responsavel, celular, email, profissao, cep, aluno, estado, serie];

  if (required.some((value) => !value) || !consentimento) return Response.json({ error: "Preencha os campos obrigatórios e aceite a autorização." }, { status: 400 });
  if (celular.replace(/\D/g, "").length < 10 || celular.replace(/\D/g, "").length > 13 || cep.replace(/\D/g, "").length !== 8 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !validStates.has(estado) || !validSeries.has(serie)) {
    return Response.json({ error: "Confira celular, e-mail, CEP, estado e série informados." }, { status: 400 });
  }

  const formData = new URLSearchParams({
    [entries.responsavel]: responsavel, [entries.celular]: celular, [entries.email]: email,
    [entries.profissao]: profissao, [entries.telefoneAdicional]: telefoneAdicional, [entries.cep]: cep,
    [entries.aluno]: aluno, [entries.estado]: estado, [entries.serie]: serie,
    [entries.primeiraEscola]: primeiraEscola ? "Sim" : "Não", [entries.escolaAtual]: escolaAtual,
    [entries.consentimento]: "Sim",
  });

  try {
    const response = await fetch(GOOGLE_FORM_RESPONSE_URL, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" }, body: formData.toString(), redirect: "follow", signal: AbortSignal.timeout(10000) });
    if (!response.ok) throw new Error("Google Forms rejeitou a solicitação");
    return Response.json({ ok: true }, { status: 201 });
  } catch {
    return Response.json({ error: "Não foi possível concluir o envio. Tente novamente em instantes." }, { status: 502 });
  }
}
