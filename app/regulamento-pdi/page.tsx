import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Regulamento do Programa de Indicação | Centro Educacional Louvor na Terra",
  description: "Regulamento do programa Família Indica Família do Centro Educacional Louvor na Terra.",
};

export default function ReferralProgramRulesPage() {
  return (
    <main className="regulation-page">
      <div className="top-strip" aria-hidden="true" />

      <header className="site-header">
        <a className="brand" href="/agendamento" aria-label="Centro Educacional Louvor na Terra">
          <span>Centro Educacional</span>
          <strong>Louvor na Terra</strong>
        </a>
        <a className="header-link" href="/agendamento">Agendar uma visita</a>
      </header>

      <section className="regulation-hero">
        <div>
          <span className="eyebrow">Regulamento oficial</span>
          <h1>Família indica família</h1>
          <p>
            Programa de indicação do Centro Educacional Louvor na Terra para valorizar quem
            apresenta nossa escola a novas famílias.
          </p>
        </div>
        <div className="regulation-benefit" aria-label="Benefício de cinquenta por cento">
          <strong>50%</strong>
          <span>de desconto em uma mensalidade por nova matrícula válida</span>
        </div>
      </section>

      <section className="regulation-shell">
        <aside className="regulation-summary">
          <span>Programa de indicação</span>
          <strong>Família indica família</strong>
          <p>Vigência desta edição</p>
          <b>01/08/2026 a 01/05/2027</b>
        </aside>

        <article className="regulation-content">
          <section>
            <h2><span>1</span> Objetivo da ação</h2>
            <p>O Programa de Indicação tem como objetivo valorizar as famílias que fazem parte da nossa comunidade escolar e apresentam nossa escola a novas famílias.</p>
            <p>Durante o período da campanha, a família responsável por uma indicação válida que resulte em uma nova matrícula terá direito a <strong>50% de desconto em uma mensalidade</strong>, conforme as condições deste regulamento.</p>
          </section>

          <section>
            <h2><span>2</span> Quem pode participar</h2>
            <p>Podem participar do programa responsáveis financeiros por alunos regularmente matriculados na escola.</p>
            <p>Para utilização do benefício, o responsável deverá estar com sua situação financeira regularizada junto à instituição.</p>
            <p>Caso existam mensalidades vencidas, o benefício ficará disponível para utilização após a regularização dos débitos.</p>
          </section>

          <section>
            <h2><span>3</span> O que é considerado uma indicação válida</h2>
            <p>Será considerada válida a indicação de uma <strong>nova família</strong> que:</p>
            <ul>
              <li>ainda não possua aluno matriculado na escola;</li>
              <li>não esteja com processo de matrícula em andamento;</li>
              <li>não tenha realizado visita ou negociação de matrícula com a escola nos últimos 90 dias;</li>
              <li>informe, no primeiro atendimento ou formulário de interesse, o nome da família/aluno que realizou a indicação;</li>
              <li>efetive uma nova matrícula durante o período de vigência da campanha.</li>
            </ul>
          </section>

          <section>
            <h2><span>4</span> Registro da indicação</h2>
            <p>A indicação deverá ser registrada pelos canais oficiais definidos pela escola.</p>
            <p>A indicação precisa ser registrada <strong>antes da efetivação da matrícula da nova família</strong>.</p>
            <p>Não serão consideradas indicações informadas retroativamente após a conclusão da matrícula.</p>
            <p>Caso a mesma família seja indicada por mais de uma pessoa, será considerada válida <strong>a primeira indicação registrada nos canais oficiais da escola</strong>.</p>
          </section>

          <section>
            <h2><span>5</span> Proteção dos dados da família indicada</h2>
            <p>A família participante não deverá fornecer dados pessoais de terceiros sem sua autorização.</p>
            <p>Preferencialmente, a família deverá encaminhar à pessoa indicada o canal oficial ou link da campanha para que ela mesma entre em contato com a escola e informe quem realizou a indicação.</p>
          </section>

          <section>
            <h2><span>6</span> Quando o benefício é conquistado</h2>
            <p>O benefício será confirmado quando:</p>
            <ol>
              <li>a nova família concluir o processo de matrícula;</li>
              <li>o contrato educacional estiver devidamente formalizado; e</li>
              <li>o primeiro pagamento previsto para a nova matrícula estiver efetivamente compensado.</li>
            </ol>
            <p>Caso a matrícula não seja concluída ou o primeiro pagamento não seja efetivado, não haverá geração do benefício.</p>
          </section>

          <section>
            <h2><span>7</span> Valor do benefício</h2>
            <p>Para cada nova matrícula válida proveniente de indicação, a família responsável pela indicação receberá:</p>
            <p className="regulation-highlight"><strong>50% de desconto sobre uma mensalidade regular.</strong></p>
            <p>O desconto incidirá exclusivamente sobre o valor da mensalidade escolar regular e não será aplicado sobre:</p>
            <ul>
              <li>material didático;</li>
              <li>uniforme;</li>
              <li>alimentação;</li>
              <li>transporte;</li>
              <li>atividades extracurriculares;</li>
              <li>passeios ou eventos;</li>
              <li>taxas;</li>
              <li>juros e multas;</li>
              <li>mensalidades vencidas;</li>
              <li>outros serviços contratados.</li>
            </ul>
          </section>

          <section>
            <h2><span>8</span> Famílias com mais de um aluno</h2>
            <p>Quando o responsável possuir mais de um aluno matriculado na escola, o desconto será aplicado à mensalidade de <strong>um único aluno</strong>, previamente definido pelas regras financeiras da instituição.</p>
            <p>O benefício não corresponderá a 50% da soma das mensalidades de todos os filhos matriculados.</p>
          </section>

          <section>
            <h2><span>9</span> Mais de uma indicação</h2>
            <p>Cada matrícula válida gera um benefício de 50%.</p>
            <p>Caso uma família consiga mais de uma indicação válida, os benefícios poderão ser utilizados em <strong>mensalidades subsequentes</strong>, sendo permitido o uso de apenas <strong>um benefício de 50% por mensalidade</strong>.</p>
            <div className="regulation-example">
              <strong>Exemplo</strong>
              <ul>
                <li>1 matrícula indicada = 50% de desconto em uma mensalidade;</li>
                <li>2 matrículas indicadas = 50% em duas mensalidades;</li>
                <li>3 matrículas indicadas = 50% em três mensalidades.</li>
              </ul>
            </div>
            <p>Os percentuais não serão somados para gerar desconto superior a 50% em uma mesma mensalidade.</p>
          </section>

          <section>
            <h2><span>10</span> Aplicação do desconto</h2>
            <p>O benefício será lançado na primeira mensalidade disponível após a confirmação da indicação, respeitando o prazo administrativo necessário para processamento financeiro.</p>
            <p>Caso a mensalidade do mês já tenha sido emitida ou processada, o benefício será aplicado no mês imediatamente seguinte.</p>
          </section>

          <section>
            <h2><span>11</span> Benefício pessoal e intransferível</h2>
            <p>O desconto:</p>
            <ul>
              <li>não poderá ser convertido em dinheiro ou PIX;</li>
              <li>não poderá ser transferido para outra família;</li>
              <li>não poderá ser utilizado para quitar débitos anteriores;</li>
              <li>não poderá ser trocado por produtos ou outros serviços.</li>
            </ul>
          </section>

          <section>
            <h2><span>12</span> Bolsas e outros descontos</h2>
            <p>O benefício do Programa de Indicação <strong>não é cumulativo com outros descontos promocionais sobre a mesma mensalidade</strong>, salvo quando expressamente autorizado pela escola.</p>
            <p>Nos casos de alunos que já possuam bolsa, convênio ou desconto permanente, a escola aplicará a condição mais vantajosa prevista para aquela mensalidade, sem somar percentuais.</p>
          </section>

          <section>
            <h2><span>13</span> Cancelamento da nova matrícula</h2>
            <p>Caso a família indicada cancele ou desista da matrícula <strong>antes da confirmação dos requisitos previstos neste regulamento</strong>, o benefício não será gerado.</p>
            <p>Após o benefício ter sido regularmente confirmado e concedido, eventual cancelamento posterior da família indicada não implicará cobrança retroativa do desconto já utilizado pela família indicadora.</p>
          </section>

          <section>
            <h2><span>14</span> Vigência</h2>
            <p>A campanha será válida para indicações registradas entre:</p>
            <p className="regulation-highlight"><strong>01/08/2026 e 01/05/2027.</strong></p>
            <p>A escola poderá realizar novas edições da campanha, com períodos e condições próprias.</p>
            <p>Indicações realizadas fora do período de vigência não gerarão benefícios referentes a esta edição.</p>
          </section>

          <section>
            <h2><span>15</span> Situações não previstas</h2>
            <p>Casos excepcionais ou situações não previstas neste regulamento serão analisados pela administração da escola, observando-se os critérios deste documento, a boa-fé e a legislação aplicável.</p>
            <p>A participação na campanha pressupõe ciência das condições apresentadas neste regulamento.</p>
          </section>
        </article>
      </section>

      <footer>
        <div className="footer-brand"><span>Centro Educacional</span><strong>Louvor na Terra</strong></div>
        <p>Educação, cuidado e propósito em cada fase.</p>
      </footer>
    </main>
  );
}
