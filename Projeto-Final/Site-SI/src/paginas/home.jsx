import { useState } from "react";

import "../App.css";
import "../css-classes/home.css";

// Mock de notícias para o carrossel
const noticiasDestaque = [
  {
    id: 1,
    categoria: "Calendário Acadêmico",
    titulo: "Período de Matrículas para o Semestre 2026.2",
    resumo:
      "O sistema SIGAA estará aberto para matrículas curriculares na próxima semana. Confira o edital e prazos.",
    imagem:
      "https://placehold.co/800x400/1351b4/ffffff?text=Matriculas+Abertas",
    link: "#",
  },
  {
    id: 2,
    categoria: "Manutenção",
    titulo: "Desligamento Programado de Energia no CSHNB",
    resumo:
      "Haverá manutenção na rede elétrica do campus neste sábado. Laboratórios estarão indisponíveis.",
    imagem:
      "https://placehold.co/800x400/e0e0e0/333333?text=Manutencao+Eletrica",
    link: "#",
  },
  {
    id: 3,
    categoria: "Eventos",
    titulo: "SINFO 2026: Inscrições Abertas!",
    resumo:
      "Participe do maior Simpósio de Sistemas de Informação da região. Vagas limitadas para os minicursos.",
    imagem: "https://placehold.co/800x400/b35900/ffffff?text=SINFO+2026",
    link: "#",
  },
];

// atalhos = referência de uma array contendo os atalhos da página Home
function Home({ atalhosRef }) {
  // Estado para controlar o índice atual do carrossel
  const [slideAtual, setSlideAtual] = useState(0);

  const proximoSlide = () => {
    setSlideAtual((prev) =>
      prev === noticiasDestaque.length - 1 ? 0 : prev + 1,
    );
  };

  const slideAnterior = () => {
    setSlideAtual((prev) =>
      prev === 0 ? noticiasDestaque.length - 1 : prev - 1,
    );
  };

  const irParaSlide = (index) => {
    setSlideAtual(index);
  };

  return (
    <main className="home-container container-lg">
      <div className="top-row">
        {/* Seção de Boas-vindas */}
        <section>
          <div>
            <h2>Bem vindo ao Site do Curso de Sistemas de Informação</h2>
            <p>
              Acesse rapidamente eventos, avisos, materiais de estudo e
              documentações essenciais para sua jornada acadêmica.
            </p>
          </div>
        </section>

        {/* Seção das Notícias */}
        <section className="carrossel-section">
          {/* Conteúdo do carrossel de notícias */}
          <div className="carrossel-wrapper">
            <div
              className="carrossel-track"
              style={{ transform: `translateX(-${slideAtual * 100}%)` }}
            >
              {noticiasDestaque.map((noticia) => (
                <div key={noticia.id} className="carrossel-slide">
                  <a href={noticia.link} className="carrossel-card">
                    <div className="carrossel-imagem">
                      <img src={noticia.imagem} alt={noticia.titulo} />
                      <span className="carrossel-badge">
                        {noticia.categoria}
                      </span>
                    </div>
                    <div className="carrossel-conteudo">
                      <h3>{noticia.titulo}</h3>
                      <p>{noticia.resumo}</p>
                    </div>
                  </a>
                </div>
              ))}
            </div>

            {/* Botões de navegação do carrossel de notícias */}
            <button
              className="br-button circle carrossel-btn btn-prev"
              onClick={slideAnterior}
              aria-label="Notícia anterior"
            >
              <i className="fas fa-chevron-left"></i>
            </button>

            <button
              className="br-button circle carrossel-btn btn-next"
              onClick={proximoSlide}
              aria-label="Próxima notícia"
            >
              <i className="fas fa-chevron-right"></i>
            </button>

            <div className="carrossel-indicadores">
              {noticiasDestaque.map((_, index) => (
                <button
                  key={index}
                  className={`indicador-ponto ${index === slideAtual ? "ativo" : ""}`}
                  onClick={() => irParaSlide(index)}
                  aria-label={`Ir para o slide ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Seção de Atalhos Rápidos */}
      <section className="atalhos-section">
        <div className="atalhos-grid">
          {atalhosRef.value.map((atalho, index) => (
            <a
              key={index}
              href={atalho.href}
              target="_blank"
              className="br-card atalho-card"
              onClick={atalho.handler}
            >
              <i className={`fas ${atalho.icon} fa-2x atalho-icone`}></i>
              <h3>{atalho.name}</h3>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;
