import "./App.css";
import "./css-classes/socials.css";

// substitua os links pelos as url reais!!!(lembrar)

const socialLinks = [
  {
    name: "Grupo Geral",
    icon: "fab fa-whatsapp",
    description: "Grupo oficial do curso de Sistemas de Informação",
    url: "https://chat.whatsapp.com/IwZJ4Yv9xmL9ITF9iis1BP",
    color: "#25D366",
  },
  {
    name: "Discord",
    icon: "fab fa-discord",
    description: "Servidor do Discord da comunidade de S.I.",
    url: "https://discord.gg/",
    color: "#5865F2",
  },
  {
    name: "Instagram Restaurante Universitário",
    icon: "fab fa-instagram",
    description: "Restaurante Universitário da UFPI",
    url: "https://www.instagram.com/ruufpicshnb?igsh=MTh5d2w3ZTNucjl1Mg==",
    color: "#E4405F",
  },
  {
    name: "Instagram do curso de S.I.",
    icon: "fab fa-instagram",
    description: "instagram oficial do curso de S.I",
    url: "https://www.instagram.com/si.ufpi?igsh=aHcxcTZ6aW1mZW02",
    color: "#E4405F",
  },
];

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
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.url}
            className="social-card"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div
              className="social-icon-wrapper"
              style={{ backgroundColor: link.color }}
            >
              <i className={link.icon}></i>
            </div>
            <div className="social-info">
              <h3 className="social-name">{link.name}</h3>
              <p className="social-description">{link.description}</p>
            </div>
            <div className="social-arrow">
              <i className="fas fa-arrow-right"></i>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default Socials;
