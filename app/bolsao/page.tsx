import type { Metadata } from "next";
import Image from "next/image";
import "./bolsao.css";
import { BolsaoForm } from "./bolsao-form";

export const metadata: Metadata = {
  title: "Bolsão 2027 | Centro Educacional Louvor na Terra",
  description: "Inscreva seu filho no Bolsão 2027 e concorra a bolsas de até 80% para o 1º ao 6º ano.",
};

function Brand() {
  return <span className="bs-brand" aria-label="Centro Educacional Louvor na Terra"><span>Centro Educacional</span><strong>Louvor na Terra</strong></span>;
}

export default function BolsaoPage() {
  return (
    <main className="bolsao-page">
      <header className="bs-header">
        <a href="#inicio"><Brand /></a>
        <nav aria-label="Navegação principal">
          <a href="#como-funciona" className="bs-nav-link">Como funciona</a>
          <a href="#inscricao" className="bs-header-cta">Fazer inscrição</a>
        </nav>
      </header>

      <section className="bs-hero" id="inicio">
        <div className="bs-hero-copy">
          <span className="bs-eyebrow">✦ Inscrições para 2027</span>
          <h1>Bolsão <span>2027</span></h1>
          <p className="bs-hero-lead">O futuro do seu filho começa com uma <strong>grande oportunidade.</strong></p>
          <div className="bs-scholarship-card">
            <div><span>Bolsas de até</span><strong>80%</strong></div>
            <p><b>1º ao 6º ano</b><small>Vagas por mérito, conforme edital.</small></p>
          </div>
          <div className="bs-actions">
            <a href="#inscricao" className="bs-primary-cta">Quero fazer a inscrição <span aria-hidden="true">→</span></a>
            <a href="/edital-bolsao" className="bs-secondary-cta" target="_blank" rel="noreferrer">▤ Consultar o edital</a>
          </div>
        </div>
        <div className="bs-hero-visual" aria-label="Estudantes do Centro Educacional Louvor na Terra">
          <Image src="/celt-a3-3.png" alt="Estudantes do Centro Educacional Louvor na Terra e informações sobre bolsas de até 80%" fill priority sizes="(max-width: 800px) 100vw, 46vw" />
        </div>
      </section>

      <section className="bs-event-strip" aria-label="Informações da prova">
        <article><span className="bs-info-icon" aria-hidden="true">▣</span><div><small>Próxima data</small><strong>31 de outubro</strong></div></article>
        <article><span className="bs-info-icon" aria-hidden="true">⌖</span><div><small>Local</small><strong>R. Ribeiro de Andrade, 323 — Padre Miguel</strong><p>Rio de Janeiro — RJ, 21810-145</p></div></article>
        <article><span className="bs-info-icon" aria-hidden="true">◷</span><div><small>Horário</small><strong>Comunicado pela equipe</strong><p>O horário correspondente ao turno será informado nos dias que antecedem a prova.</p></div></article>
      </section>

      <section className="bs-how" id="como-funciona">
        <div className="bs-section-heading">
          <span className="bs-eyebrow bs-light">Uma oportunidade que transforma</span>
          <h2>Talento e dedicação podem abrir novas portas.</h2>
          <p>O Bolsão CELT seleciona estudantes para bolsas de estudo de até 80%, de acordo com o desempenho na prova e os critérios do edital.</p>
        </div>
        <div className="bs-steps">
          <article><span>01</span><b aria-hidden="true">◎</b><h3>Escolha a série</h3><p>Inscrições abertas do 1º ao 6º ano para o ano letivo de 2027.</p></article>
          <article><span>02</span><b aria-hidden="true">★</b><h3>Participe da prova</h3><p>A avaliação acontece presencialmente no dia 31 de outubro.</p></article>
          <article><span>03</span><b aria-hidden="true">✓</b><h3>Concorra à bolsa</h3><p>Os melhores desempenhos poderão conquistar bolsas de até 80%.</p></article>
        </div>
      </section>

      <section className="bs-registration" id="inscricao">
        <div className="bs-registration-intro">
          <span className="bs-eyebrow">Inscrição para o Bolsão 2027</span>
          <h2>Dê o primeiro passo para essa conquista.</h2>
          <p>Preencha os dados do responsável e do estudante. Nossa equipe usará essas informações para enviar as orientações sobre a prova.</p>
          <a href="/edital-bolsao" target="_blank" rel="noreferrer" className="bs-notice"><b aria-hidden="true">▤</b><span><strong>Leia o edital completo</strong>Consulte regras, critérios e condições das bolsas.</span><i aria-hidden="true">→</i></a>
        </div>
        <BolsaoForm />
      </section>

      <footer className="bs-footer"><Brand /><p>Educação, cuidado e propósito em cada fase.</p><a href="/edital-bolsao" target="_blank" rel="noreferrer">Edital do Bolsão 2027</a></footer>
    </main>
  );
}
