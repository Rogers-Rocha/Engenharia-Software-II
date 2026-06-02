import "../App.css";
import "../css-classes/livros.css";

// Mock de dados: Simulando o retorno de uma API ou Banco de Dados
const catalogo = [
  {
    categoria: "Banco de Dados",
    livros: [
      {
        id: 1,
        titulo: "Sistemas de Banco de Dados",
        autor: "Ramez Elmasri & Shamkant B. Navathe",
        imagem: "https://placehold.co/200x300/e0e0e0/333333?text=BD+Elmasri",
        link: "https://www.amazon.com.br/dp/8543004838",
      },
      {
        id: 2,
        titulo: "SQL Básico",
        autor: "Ben Forta",
        imagem: "https://placehold.co/200x300/e0e0e0/333333?text=SQL+Basico",
        link: "https://www.amazon.com.br/dp/8543004838",
      },
    ],
  },
  {
    categoria: "Programação em Python",
    livros: [
      {
        id: 3,
        titulo: "Python Fluente",
        autor: "Luciano Ramalho",
        imagem:
          "https://placehold.co/200x300/e0e0e0/333333?text=Python+Fluente",
        link: "https://www.amazon.com.br/dp/8543004838",
      },
      {
        id: 4,
        titulo: "Python Simplificado",
        autor: "Eric Matthes",
        imagem:
          "https://placehold.co/200x300/e0e0e0/333333?text=Python+Simplificado",
        link: "https://www.amazon.com.br/dp/8543004838",
      },
      {
        id: 5,
        titulo: "Automatize Tarefas Maçantes com Python",
        autor: "Al Sweigart",
        imagem:
          "https://placehold.co/200x300/e0e0e0/333333?text=Automatize+Python",
        link: "https://www.amazon.com.br/dp/8543004838", // Link mockado
      },
    ],
  },
];

function Livros() {
  return (
    <main className="livros-container">
      <div className="cabecalho-modulo">
        <h2>Catálogo de Livros</h2>
        <p>Livros utilizados pelos professores e alunos do curso</p>
      </div>

      {/* Mapeia cada categoria do catálogo */}
      {catalogo.map((secao, index) => (
        <section key={index} className="categoria-section">
          {/* Título da Categoria e Divisor */}
          <h3 className="categoria-titulo">{secao.categoria}</h3>
          <div className="br-divider"></div>

          {/* Grid contendo os livros daquela categoria específica */}
          <div className="livros-grid">
            {secao.livros.map((livro) => (
              <a
                key={livro.id}
                href={livro.link}
                target="_blank"
                rel="noopener noreferrer"
                className="br-card hover clickable-card"
                aria-label={`Acessar o site ${livro.nome}`}
              >
                <div className="card-image">
                  <img
                    src={livro.imagem}
                    alt={`Capa do livro ${livro.titulo}`}
                  />
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
