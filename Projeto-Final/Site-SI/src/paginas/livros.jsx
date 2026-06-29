// src/paginas/livros.jsx
import "../App.css";
import "../css-classes/livros.css";

import { useColecao } from "../firebase/useColecao.js";
import { Carregando, ErroCarregamento } from "../componentes/estadoPagina.jsx";

function Livros() {
  const { dados, carregando, erro } = useColecao("livros", "categoria");

  if (carregando) return <Carregando mensagem="Carregando catálogo de livros..." />;
  if (erro)       return <ErroCarregamento />;

  return (
    <main className="livros-container">
      <div className="cabecalho-modulo">
        <h2>Catálogo de Livros</h2>
        <p>Livros utilizados pelos professores e alunos do curso</p>
      </div>

      {dados.map((secao) => (
        <section key={secao.id} className="categoria-section">
          <h3 className="categoria-titulo">{secao.categoria}</h3>
          <div className="br-divider"></div>

          <div className="livros-grid">
            {secao.livros.map((livro) => (
              <a
                key={livro.id}
                href={livro.link}
                target="_blank"
                rel="noopener noreferrer"
                className="br-card hover clickable-card"
                aria-label={`Acessar o livro ${livro.titulo}`}
              >
                <div className="card-image">
                  <img src={livro.imagem} alt={`Capa do livro ${livro.titulo}`} />
                </div>
                <div className="card-content">
                  <h4 className="livro-titulo">{livro.titulo}</h4>
                  <span className="livro-autor">{livro.autor}</span>
                </div>
              </a>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}

export default Livros;