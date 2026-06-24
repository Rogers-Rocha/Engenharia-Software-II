import "../App.css";
import "../css-classes/socials.css";

import { FaDiscord } from "react-icons/fa";

// Mock dos links das redes sociais
const socialLinks = [
  {
    id: "whatsapp",
    name: "Grupo Geral",
    icon: "fab fa-whatsapp",
    description: "Grupo oficial do curso de Sistemas de Informação",
    url: "https://chat.whatsapp.com/IwZJ4Yv9xmL9ITF9iis1BP",
    color: "#25D366",
  },
  {
    id: "discord",
    name: "Discord",
    icon: "fab fa-discord",
    iconComponent: FaDiscord,
    description: "Servidor do Discord da comunidade de S.I.",
    url: "https://discord.gg/",
    color: "#5865F2",
  },
  {
    id: "instagram-ru",
    name: "Instagram Restaurante Universitário",
    icon: "fab fa-instagram",
    description: "Restaurante Universitário da UFPI",
    url: "https://www.instagram.com/ruufpicshnb?igsh=MTh5d2w3ZTNucjl1Mg==",
    color: "#E4405F",
  },
  {
    id: "instagram-si",
    name: "Instagram do curso de S.I.",
    icon: "fab fa-instagram",
    description: "Instagram oficial do curso de S.I",
    url: "https://www.instagram.com/si.ufpi?igsh=aHcxcTZ6aW1mZW02",
    color: "#E4405F",
  },
];

// Ordem de exibição: [0, 2, 1, 3] -> 1 3 / 2 4
const ordemExibicao = [0, 2, 1, 3];

function Socials() {
  return (
    <div className="socials-page">
      <div className="socials-header">
        <h2>Redes Sociais</h2>
        <p className="socials-subtitle">
          Conecte-se com a comunidade de Sistemas de Informação
        </p>
      </div>

      <div className="socials-grid">
        {ordemExibicao.map((index) => {
          const link = socialLinks[index];

          // Discord usa SVG do react-icons; demais usam Font Awesome
          const renderIcon = () => {
            if (link.iconComponent) {
              const IconComponent = link.iconComponent;
              return <IconComponent className="social-icon social-icon-svg" style={{ color: link.color }} />;
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
