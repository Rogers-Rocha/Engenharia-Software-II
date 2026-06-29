// src/paginas/eventos.jsx
import "../App.css";
import "../css-classes/eventos.css";

import { useColecao } from "../firebase/useColecao.js";
import { Carregando, ErroCarregamento } from "../componentes/estadoPagina.jsx";

const obterStatusEvento = (inscricaoInicio, inscricaoFim, dataInicio, dataFim) => {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  if (hoje > dataFim)
    return { texto: "Encerrado", classe: "status-encerrado" };
  if (hoje >= dataInicio && hoje <= dataFim)
    return { texto: "Em andamento", classe: "status-andamento" };
  if (hoje >= inscricaoInicio && hoje <= inscricaoFim)
    return { texto: "Inscrições Abertas", classe: "status-abertas" };
  return { texto: "Em breve", classe: "status-breve" };
};

const formatarData = (data) =>
  data.toLocaleDateString("pt-BR", {
    day: "2-digit", month: "2-digit", year: "numeric",
  });

function Eventos() {
  const { dados, carregando, erro } = useColecao("eventos");

  if (carregando) return <Carregando mensagem="Carregando eventos..." />;
  if (erro)       return <ErroCarregamento />;

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
        {dados.map((evento) => {
          // Converte Timestamp do Firestore → Date do JavaScript
          const inscricaoInicio = evento.inscricaoInicio.toDate();
          const inscricaoFim    = evento.inscricaoFim.toDate();
          const dataInicio      = evento.dataInicio.toDate();
          const dataFim         = evento.dataFim.toDate();

          const statusDinamico = obterStatusEvento(
            inscricaoInicio, inscricaoFim, dataInicio, dataFim,
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
                      <i className="fas fa-external-link-alt icone-externo" aria-hidden="true"></i>
                    </strong>
                    <span>
                      {formatarData(inscricaoInicio)} a {formatarData(inscricaoFim)}
                    </span>
                  </div>
                </a>

                <div className="evento-data-bloco">
                  <i className="fas fa-calendar-alt data-icone" aria-hidden="true"></i>
                  <div className="data-info">
                    <strong>Período do Evento:</strong>
                    <span>
                      {formatarData(dataInicio)} até {formatarData(dataFim)}
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