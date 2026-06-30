import "../App.css";
import "../css-classes/socials.css";

import { useColecao } from "../firebase/useColecao.js";
import { Carregando, ErroCarregamento } from "../componentes/estadoPagina.jsx";

function Socials() {
  const { dados, carregando, erro } = useColecao("socials");

  if (carregando) return <Carregando mensagem="Carregando redes sociais..." />;
  if (erro) return <ErroCarregamento />;

  return (
    <div className="socials-page">
      <div className="socials-header">
        <h2>Redes Sociais</h2>
        <p className="socials-subtitle">
          Conecte-se com a comunidade de Sistemas de Informação
        </p>
      </div>

      <div className="socials-grid">
        {dados.map((link) => {
          return (
            <a
              key={link.id}
              href={link.url}
              className="social-card"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="social-card-top">
                <i
                  className={`${link.icon} fa-fw social-icon`}
                  style={{ color: link.color }}
                />
              </div>
              <div className="social-card-body">
                <h3 className="social-name">{link.name}</h3>
                <p className="social-description">{link.description}</p>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}

export default Socials;
