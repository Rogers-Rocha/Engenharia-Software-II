import { useState } from "react";

import "./App.css";
import "./css-classes/home.css";

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

function Home() {
  // Estado para controlar o índice atual do carrossel
  const [slideAtual, setSlideAtual] = useState(0);

  // Funções de navegação do carrossel
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
      {/* LINHA SUPERIOR: Hero lado a lado com o Carrossel */}
      <div className="top-row">
        {/* 1. Seção Hero (Boas-vindas) */}
        <section>
          <div>
            <h2>Bem vindo ao Site do Curso de Sistemas de Informação</h2>
            <p>
              Acesse rapidamente eventos, avisos, materiais de estudo e
              documentações essenciais para sua jornada acadêmica.
            </p>
          </div>
        </section>

        {/* 2. Seção do Carrossel de Notícias */}
        <section className="carrossel-section">
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

      {/* 3. Seção de Atalhos Rápidos (Abaixo do bloco principal) */}
      <section className="atalhos-section">
        <div className="atalhos-grid">
          <a href="#eventos" className="br-card atalho-card">
            <i className="fas fa-calendar-alt fa-2x atalho-icone"></i>
            <h3>Eventos</h3>
          </a>
          <a href="#livros" className="br-card atalho-card">
            <i className="fas fa-book fa-2x atalho-icone"></i>
            <h3>Livros</h3>
          </a>
          <a href="#sites" className="br-card atalho-card">
            <i className="fas fa-link fa-2x atalho-icone"></i>
            <h3>Sites Importantes</h3>
          </a>
          <a href="#noticias" className="br-card atalho-card">
            <i className="fas fa-newspaper fa-2x atalho-icone"></i>
            <h3>Notícias</h3>
          </a>
        </div>
      </section>
    </main>
  );
}

export default Home;
