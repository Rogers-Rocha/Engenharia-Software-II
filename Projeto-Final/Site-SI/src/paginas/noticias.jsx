// src/paginas/noticias.jsx
import "../App.css";
import "../css-classes/noticias.css";

import { useColecao } from "../firebase/useColecao.js";
import { Carregando, ErroCarregamento } from "../componentes/estadoPagina.jsx";

const formatarData = (data) =>
  data.toLocaleDateString("pt-BR", {
    day: "2-digit", month: "long", year: "numeric",
  });

function Noticias() {
  const { dados, carregando, erro } = useColecao("noticias", "dataPublicacao");

  if (carregando) return <Carregando mensagem="Carregando notícias..." />;
  if (erro)       return <ErroCarregamento />;

  return (
    <main className="noticias-container container-lg">
      <div className="cabecalho-modulo">
        <h2>Últimas Notícias e Avisos</h2>
        <p>
          Fique por dentro do que acontece no curso de Sistemas de Informação e
          no campus da UFPI/CSHNB.
        </p>
      </div>

      <div className="noticias-grid">
        {dados.map((noticia) => {
          // Converte Timestamp do Firestore → Date do JavaScript
          const dataFormatada = formatarData(noticia.dataPublicacao.toDate());

          return (
            <a
              key={noticia.id}
              href={noticia.link}
              target="_blank"
              className="br-card noticia-card clickable-card"
              aria-label={`Ler notícia: ${noticia.titulo}`}
            >
              <div className="noticia-imagem">
                <img
                  src={noticia.imagem}
                  alt={`Capa da notícia sobre ${noticia.categoria}`}
                />
              </div>

              <div className="noticia-body">
                <div className="noticia-meta">
                  <span className="noticia-categoria">{noticia.categoria}</span>
                  <span className="noticia-data">{dataFormatada}</span>
                </div>
                <h3 className="noticia-titulo">{noticia.titulo}</h3>
                <p className="noticia-resumo">{noticia.resumo}</p>
              </div>
            </a>
          );
        })}
      </div>
    </main>
  );
}

export default Noticias;