"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

const SERIES = [
  "Maternal 1", "Maternal 2", "Pré-escolar 1", "Pré-escolar 2",
  "1º ano", "2º ano", "3º ano", "4º ano", "5º ano", "6º ano",
];

const ALL_SLOTS = Array.from({ length: 18 }, (_, index) => {
  const minutes = 8 * 60 + index * 30;
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
});

type Status = "idle" | "sending" | "success" | "error";

function toIsoDate(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function nextBusinessDay() {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  while (date.getDay() === 0 || date.getDay() === 6) date.setDate(date.getDate() + 1);
  return toIsoDate(date);
}

function maxBookingDate() {
  const date = new Date();
  date.setDate(date.getDate() + 90);
  return toIsoDate(date);
}

export default function Home() {
  const [status, setStatus] = useState<Status>("idle");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [blockedSlots, setBlockedSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const minDate = useMemo(nextBusinessDay, []);
  const maxDate = useMemo(maxBookingDate, []);

  useEffect(() => {
    if (!date) {
      setBlockedSlots([]);
      setTime("");
      return;
    }

    const selected = new Date(`${date}T12:00:00`);
    if (selected.getDay() === 0 || selected.getDay() === 6) {
      setBlockedSlots(ALL_SLOTS);
      setTime("");
      return;
    }

    const controller = new AbortController();
    setLoadingSlots(true);
    fetch(`/api/agendamentos?data=${encodeURIComponent(date)}`, { signal: controller.signal })
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((data) => {
        setBlockedSlots(Array.isArray(data.indisponiveis) ? data.indisponiveis : []);
        setTime((current) => data.indisponiveis?.includes(current) ? "" : current);
      })
      .catch(() => setBlockedSlots([]))
      .finally(() => setLoadingSlots(false));

    return () => controller.abort();
  }, [date]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!time) return;
    setStatus("sending");

    const form = event.currentTarget;
    const payload = { ...Object.fromEntries(new FormData(form).entries()), horario: time };

    try {
      const response = await fetch("/api/agendamentos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Não foi possível agendar");
      form.reset();
      setDate("");
      setTime("");
      setStatus("success");
      document.querySelector("#agendamento")?.scrollIntoView({ behavior: "smooth" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <main>
      <div className="top-strip" aria-hidden="true" />
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Centro Educacional Louvor na Terra — início">
          <span>Centro Educacional</span>
          <strong>Louvor na Terra</strong>
        </a>
        <a className="header-link" href="#agendamento">Agendar minha visita</a>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <span className="eyebrow">Venha nos conhecer</span>
          <h1>Um lugar para aprender, crescer e se sentir em casa.</h1>
          <p className="lead">
            Agende sua visita e conheça de perto uma estrutura pensada para cada fase, em um ambiente acolhedor e com um método que une aprendizagem, cuidado e propósito.
          </p>
          <a className="hero-button" href="#agendamento">Escolher dia e horário <span aria-hidden="true">→</span></a>
          <p className="availability-note"><b>Visitas de segunda a sexta</b><span>•</span> das 8h às 17h</p>
        </div>

        <div className="school-collage" aria-label="Fotos da estrutura da escola">
          <figure className="photo photo-main"><img src="/escola-fachada.png" alt="Entrada da Creche Louvor na Terra" /></figure>
          <figure className="photo photo-play"><img src="/escola-brinquedoteca.png" alt="Crianças brincando na piscina de bolinhas" /></figure>
          <figure className="photo photo-class"><img src="/escola-sala.png" alt="Sala de aula preparada para as crianças" /></figure>
          <figure className="photo photo-care"><img src="/escola-refeitorio.png" alt="Utensílios infantis organizados no refeitório" /></figure>
          <figure className="photo photo-space"><img src="/escola-corredor.png" alt="Corredor infantil decorado da escola" /></figure>
        </div>
      </section>

      <section className="form-section" id="agendamento">
        <div className="form-intro">
          <span className="eyebrow eyebrow-light">Sua visita começa aqui</span>
          <h2>Escolha o melhor momento para conhecer a escola.</h2>
          <p>Selecione uma data e um horário disponíveis. Assim, nossa equipe já poderá preparar uma recepção especial para sua família.</p>
          <div className="visit-points">
            <p><span>01</span> Conheça os espaços e a rotina</p>
            <p><span>02</span> Converse com nossa equipe pedagógica</p>
            <p><span>03</span> Tire suas dúvidas sobre matrícula</p>
          </div>
        </div>

        <div className="form-card">
          {status === "success" ? (
            <div className="success-message" role="status">
              <div className="success-icon" aria-hidden="true">✓</div>
              <span className="eyebrow">Visita solicitada</span>
              <h2>Seu horário foi reservado!</h2>
              <p>Recebemos seus dados e entraremos em contato pelo WhatsApp para confirmar os detalhes da visita.</p>
              <button className="secondary-button" type="button" onClick={() => setStatus("idle")}>Agendar outra visita</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="field full">
                <label htmlFor="responsavel">Nome do responsável</label>
                <input id="responsavel" name="responsavel" autoComplete="name" placeholder="Digite seu nome completo" required />
              </div>

              <div className="field full">
                <label htmlFor="whatsapp">WhatsApp com DDD</label>
                <input id="whatsapp" name="whatsapp" type="tel" inputMode="tel" autoComplete="tel" placeholder="(00) 00000-0000" pattern="[0-9() +\-]{10,20}" required />
              </div>

              <div className="field full">
                <label htmlFor="crianca">Nome da criança</label>
                <input id="crianca" name="crianca" placeholder="Digite o nome da criança" required />
              </div>

              <div className="field">
                <label htmlFor="serie">Série de interesse</label>
                <select id="serie" name="serie" defaultValue="" required>
                  <option value="" disabled>Selecione</option>
                  {SERIES.map((serie) => <option key={serie}>{serie}</option>)}
                </select>
              </div>

              <fieldset className="field turn-field">
                <legend>Turno de interesse</legend>
                <div className="choice-row">
                  <label><input type="radio" name="turno" value="Manhã" required /><span>Manhã</span></label>
                  <label><input type="radio" name="turno" value="Tarde" required /><span>Tarde</span></label>
                </div>
              </fieldset>

              <div className="field full">
                <label htmlFor="indicador">Nome da criança ou família que fez a indicação</label>
                <input id="indicador" name="indicador" placeholder="Digite quem indicou a escola" required />
              </div>

              <div className="field full date-field">
                <label htmlFor="data">Data da visita</label>
                <input id="data" name="data" type="date" min={minDate} max={maxDate} value={date} onChange={(event) => setDate(event.target.value)} required />
                <small>Atendimento de segunda a sexta-feira.</small>
              </div>

              {date && (
                <fieldset className="field full time-field">
                  <legend>Horário da visita</legend>
                  {loadingSlots ? (
                    <p className="slot-message">Consultando horários disponíveis…</p>
                  ) : blockedSlots.length === ALL_SLOTS.length ? (
                    <p className="slot-message slot-alert">Não há atendimento nesta data. Escolha um dia útil.</p>
                  ) : (
                    <div className="time-grid">
                      {ALL_SLOTS.map((slot) => {
                        const blocked = blockedSlots.includes(slot);
                        return (
                          <button key={slot} type="button" disabled={blocked} className={time === slot ? "selected" : ""} onClick={() => setTime(slot)} aria-pressed={time === slot}>
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </fieldset>
              )}

              <label className="consent full">
                <input type="checkbox" name="consentimento" value="sim" required />
                <span>Autorizo o Centro Educacional Louvor na Terra a entrar em contato comigo por telefone ou WhatsApp sobre esta solicitação.</span>
              </label>

              {status === "error" && <p className="error-message" role="alert">Não conseguimos reservar este horário. Atualize a página ou escolha outro horário.</p>}

              <button className="submit-button full" type="submit" disabled={status === "sending" || !time}>
                {status === "sending" ? "Reservando…" : "Confirmar agendamento"}<span aria-hidden="true">→</span>
              </button>
              <p className="required-note full">A escola confirmará a visita pelo WhatsApp informado.</p>
            </form>
          )}
        </div>
      </section>

      <footer>
        <div className="footer-brand"><span>Centro Educacional</span><strong>Louvor na Terra</strong></div>
        <p>Educação, cuidado e propósito em cada fase.</p>
      </footer>
    </main>
  );
}
