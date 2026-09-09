"use client";

import { useState } from "react";

const SERIES = ["1º ano", "2º ano", "3º ano", "4º ano", "5º ano", "6º ano"];
const STATES = ["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"];

type FieldProps = {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
  optional?: boolean;
  autoComplete?: string;
  inputMode?: "text" | "email" | "tel" | "numeric";
};

function Field({ id, label, placeholder, type = "text", optional = false, autoComplete, inputMode }: FieldProps) {
  return (
    <label className="bs-field" htmlFor={id}>
      <span>{label} {!optional && <em aria-hidden="true">*</em>}{optional && <small>Opcional</small>}</span>
      <input id={id} name={id} type={type} placeholder={placeholder} required={!optional} autoComplete={autoComplete} inputMode={inputMode} />
    </label>
  );
}

export function BolsaoForm() {
  const [firstSchool, setFirstSchool] = useState(false);
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: { preventDefault(): void; currentTarget: HTMLFormElement }) {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage("");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/inscricoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, primeiraEscola: firstSchool, consentimento: consent }),
      });
      const result = await response.json().catch(() => ({})) as { error?: string };
      if (!response.ok) throw new Error(result.error || "Não foi possível enviar a inscrição.");
      form.reset();
      setFirstSchool(false);
      setConsent(false);
      setStatus("success");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Não foi possível enviar a inscrição.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <output className="bs-form-card bs-success">
        <span className="bs-success-icon" aria-hidden="true">✓</span>
        <span className="bs-eyebrow">Inscrição enviada</span>
        <h3>Recebemos seus dados!</h3>
        <p>Nossa equipe entrará em contato para enviar as orientações sobre a prova do Bolsão 2027.</p>
        <button type="button" className="bs-submit" onClick={() => setStatus("idle")}>Fazer outra inscrição →</button>
      </output>
    );
  }

  return (
    <div className="bs-form-card">
      <form className="bs-form" onSubmit={handleSubmit}>
        <fieldset disabled={status === "sending"}>
          <legend><span>1</span> Dados do responsável</legend>
          <div className="bs-form-grid">
            <Field id="responsavel" label="Nome do responsável" placeholder="Digite o nome completo" autoComplete="name" />
            <Field id="celular" label="Celular" placeholder="(00) 00000-0000" type="tel" autoComplete="tel" inputMode="tel" />
            <Field id="email" label="E-mail" placeholder="voce@exemplo.com" type="email" autoComplete="email" inputMode="email" />
            <Field id="profissao" label="Profissão" placeholder="Informe sua profissão" />
            <Field id="telefone-adicional" label="Telefone adicional" placeholder="(00) 00000-0000" type="tel" optional inputMode="tel" />
            <Field id="cep" label="CEP" placeholder="00000-000" autoComplete="postal-code" inputMode="numeric" />
          </div>
        </fieldset>
        <fieldset disabled={status === "sending"}>
          <legend><span>2</span> Dados do aluno</legend>
          <div className="bs-form-grid">
            <Field id="aluno" label="Nome do aluno" placeholder="Digite o nome completo" />
            <label className="bs-field" htmlFor="estado"><span>Estado <em aria-hidden="true">*</em></span><select id="estado" name="estado" defaultValue="" required><option value="" disabled>Selecione o estado</option>{STATES.map((state) => <option key={state}>{state}</option>)}</select></label>
            <label className="bs-field bs-wide" htmlFor="serie"><span>Série em 2027 <em aria-hidden="true">*</em></span><select id="serie" name="serie" defaultValue="" required><option value="" disabled>Selecione a série</option>{SERIES.map((serie) => <option key={serie}>{serie}</option>)}</select></label>
            <div className="bs-first-school bs-wide"><span><strong>Será a primeira escola do aluno?</strong><small>Marque se ele ainda não estuda em outra instituição.</small></span><label className="bs-switch"><input type="checkbox" checked={firstSchool} onChange={(event) => setFirstSchool(event.target.checked)} aria-label="Será a primeira escola do aluno?" /><i /></label></div>
            <div className="bs-wide"><Field id="escola-atual" label="Escola atual" placeholder="Informe a escola atual, se aplicável" optional /></div>
          </div>
        </fieldset>
        <div className="bs-privacy"><input id="consentimento" type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} required /><label htmlFor="consentimento">Autorizo o Centro Educacional Louvor na Terra a entrar em contato sobre esta inscrição e declaro estar ciente do uso dos dados para comunicação relacionada ao Bolsão, conforme a Política de Privacidade.</label></div>
        <button type="submit" disabled={!consent || status === "sending"} className="bs-submit">{status === "sending" ? "Enviando inscrição..." : "Enviar inscrição →"}</button>
        {status === "error" && <p className="bs-error" role="alert">{errorMessage}</p>}
        <p className="bs-form-note">Ao enviar, os dados serão registrados para atendimento da equipe do CELT.</p>
      </form>
    </div>
  );
}
