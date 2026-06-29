import { useColecao } from "../firebase/useColecao.js"; // Ajuste o caminho do import se necessário
import "../App.css";
import "../css-classes/socials.css";

import { FaDiscord } from "react-icons/fa";

function Socials() {
  const { dados, carregando, erro } = useColecao("socials");

  if (carregando) {
    return <div className="loading">Carregando redes sociais...</div>;
  }

  if (erro) {
    return <div className="error">Erro ao carregar dados: {erro}</div>;
  }

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
          // Renderiza dinamicamente: se for Discord usa o SVG, se não, usa Font Awesome
          const renderIcon = () => {
            if (link.icon === "fab fa-discord" || link.id === "discord") {
              return (
                <FaDiscord
                  className="social-icon social-icon-svg"
                  style={{ color: link.color }}
                />
              );
            }
            return (
              <i
                className={`${link.icon} social-icon`}
                style={{ color: link.color }}
              ></i>
            );
          };

          return (
            <a
              key={link.id}
              href={link.url}
              className="social-card"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="social-card-top">{renderIcon()}</div>
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
