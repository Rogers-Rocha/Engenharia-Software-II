import "../App.css";
import "../css-classes/eventos.css";

// Mock de dados: Eventos relevantes para S.I. na UFPI/CSHNB
const catalogoEventos = [
  {
    id: 1,
    nome: "SINFO - Simpósio de Sistemas de Informação",
    descricao:
      "O principal evento anual do curso de S.I. da UFPI/CSHNB. Conta com palestras de especialistas do mercado, minicursos práticos, maratona de programação e submissão de artigos científicos.",
    inscricaoInicio: new Date(2026, 7, 1), // 01/08/2026
    inscricaoFim: new Date(2026, 7, 15), // 15/08/2026
    dataInicio: new Date(2026, 7, 20), // 20/08/2026
    dataFim: new Date(2026, 7, 23), // 23/08/2026
    linkInscricao: "https://sigeventos.ufpi.br/evento/sinfo2026",
  },
  {
    id: 2,
    nome: "StartUFPI",
    descricao:
      "Evento voltado para inovação e empreendedorismo universitário. Equipes de alunos montam modelos de negócios para startups e apresentam para bancas de investidores e professores.",
    inscricaoInicio: new Date(2026, 8, 10), // 10/09/2026
    inscricaoFim: new Date(2026, 8, 30), // 30/09/2026
    dataInicio: new Date(2026, 9, 5), // 05/10/2026
    dataFim: new Date(2026, 9, 7), // 07/10/2026
    linkInscricao: "https://sigeventos.ufpi.br/evento/startufpi",
  },
  {
    id: 3,
    nome: "Hack the Data - UFPI",
    descricao:
      "Um Hackathon intensivo de 48 horas focado em Ciência de Dados e Inteligência Artificial. Resolva problemas reais da região de Picos utilizando grandes volumes de dados.",
    inscricaoInicio: new Date(2026, 4, 1), // 01/05/2026
    inscricaoFim: new Date(2026, 4, 30), // 30/05/2026
    dataInicio: new Date(2026, 4, 31), // 31/05/2026
    dataFim: new Date(2026, 5, 5), // 05/06/2026
    linkInscricao: "https://sigeventos.ufpi.br/evento/hackthedata",
  },
];

const obterStatusEvento = (
  inscricaoInicio,
  inscricaoFim,
  dataInicio,
  dataFim,
) => {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0); // Zera as horas para comparar apenas os dias

  if (hoje > dataFim) {
    return { texto: "Encerrado", classe: "status-encerrado" };
  } else if (hoje >= dataInicio && hoje <= dataFim) {
    return { texto: "Em andamento", classe: "status-andamento" };
  } else if (hoje >= inscricaoInicio && hoje <= inscricaoFim) {
    return { texto: "Inscrições Abertas", classe: "status-abertas" };
  } else {
    return { texto: "Em breve", classe: "status-breve" };
  }
};

// Helper para formatar a classe Date de volta para String no padrão brasileiro "DD/MM/YYYY" na hora de desenhar na tela
const formatarData = (dataBase) => {
  return dataBase.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

function Eventos() {
  return (
    <main className="eventos-container container-lg">
      <div className="cabecalho-modulo">
        <h2>Agenda de Eventos</h2>
        <p>
          Acompanhe os principais eventos de tecnologia relevantes pro curso de
          Sistemas de Informações.
        </p>
      </div>

      <div className="eventos-grid">
        {catalogoEventos.map((evento) => {
          const statusDinamico = obterStatusEvento(
            evento.inscricaoInicio,
            evento.inscricaoFim,
            evento.dataInicio,
            evento.dataFim,
          );

          return (
            <article key={evento.id} className="br-card evento-card">
              <div className="evento-header">
                <h3 className="evento-titulo">{evento.nome}</h3>
                <span className={`evento-badge ${statusDinamico.classe}`}>
                  {statusDinamico.texto}
                </span>
              </div>

              <div className="evento-body">
                <p className="evento-descricao">{evento.descricao}</p>
              </div>

              <div className="evento-footer">
                <a
                  href={evento.linkInscricao}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="evento-data-bloco bloco-clicavel"
                  aria-label={`Realizar inscrição no evento ${evento.nome}`}
                >
                  <i className="fas fa-edit data-icone" aria-hidden="true"></i>
                  <div className="data-info">
                    <strong className="destaque-link">
                      Inscrições{" "}
                      <i
                        className="fas fa-external-link-alt icone-externo"
                        aria-hidden="true"
                      ></i>
                    </strong>
                    {/* Convertendo as datas nativas para String na hora de renderizar */}
                    <span>
                      {formatarData(evento.inscricaoInicio)} a{" "}
                      {formatarData(evento.inscricaoFim)}
                    </span>
                  </div>
                </a>

                <div className="evento-data-bloco">
                  <i
                    className="fas fa-calendar-alt data-icone"
                    aria-hidden="true"
                  ></i>
                  <div className="data-info">
                    <strong>Período do Evento:</strong>
                    {/* Convertendo as datas nativas para String na hora de renderizar */}
                    <span>
                      {formatarData(evento.dataInicio)} até{" "}
                      {formatarData(evento.dataFim)}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}

export default Eventos;
