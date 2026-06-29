// src/paginas/sites.jsx
import "../App.css";
import "../css-classes/sites.css";

import { useColecao } from "../firebase/useColecao.js";
import { Carregando, ErroCarregamento } from "../componentes/estadoPagina.jsx";

function Sites() {
  const { dados, carregando, erro } = useColecao("sites", "categoria");

  if (carregando) return <Carregando mensagem="Carregando sites úteis..." />;
  if (erro)       return <ErroCarregamento />;

  return (
    <main className="sites-container container-lg">
      <div className="cabecalho-modulo">
        <h2>Sites Úteis</h2>
        <p>
          Links úteis e documentações essenciais pro aluno do curso de Sistemas
          de Informações.
        </p>
      </div>

      {dados.map((secao) => (
        <section key={secao.id} className="categoria-section">
          <h3 className="categoria-titulo">
            <i className={`${secao.iconeSecao} titulo-icone`} aria-hidden="true"></i>
            {secao.categoria}
          </h3>
          <div className="br-divider"></div>

          <div className="sites-grid">
            {secao.sites.map((site) => (
              
                key={site.id}
                href={site.link}
                target="_blank"
                rel="noopener noreferrer"
                className="br-card hover clickable-card site-card"
                aria-label={`Acessar o site ${site.nome}`}
              >
                <div className="card-content">
                  <h4 className="site-titulo">{site.nome}</h4>
                  <p className="site-descricao">{site.descricao}</p>
                </div>
              </a>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}

export default Sites;