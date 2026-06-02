import "../App.css";
import "../css-classes/sites.css";

// Mock de dados: Categorias e seus respectivos sites
const catalogoSites = [
  {
    categoria: "Banco de Dados",
    iconeSecao: "fas fa-database",
    sites: [
      {
        id: 1,
        nome: "PostgreSQL - Site Oficial",
        descricao:
          "Documentação oficial, tutoriais e downloads do banco de dados relacional open source mais avançado do mundo.",
        link: "https://www.postgresql.org/",
      },
      {
        id: 2,
        nome: "MongoDB Docs",
        descricao:
          "Guias de implementação e manuais para o popular banco de dados NoSQL orientado a documentos.",
        link: "https://www.mongodb.com/docs/",
      },
    ],
  },
  {
    categoria: "Estrutura de Dados",
    iconeSecao: "fas fa-sitemap",
    sites: [
      {
        id: 3,
        nome: "GeeksforGeeks",
        descricao:
          "Um dos maiores portais sobre algoritmos, estruturas de dados e preparação para entrevistas de TI.",
        link: "https://www.geeksforgeeks.org/data-structures/",
      },
      {
        id: 4,
        nome: "VisuAlgo",
        descricao:
          "Plataforma excelente para visualizar animações do funcionamento de estruturas de dados e algoritmos complexos.",
        link: "https://visualgo.net/en",
      },
    ],
  },
  {
    categoria: "Programação Web",
    iconeSecao: "fas fa-globe",
    sites: [
      {
        id: 5,
        nome: "MDN Web Docs",
        descricao:
          "A referência definitiva da Mozilla para HTML, CSS e JavaScript. Essencial para qualquer desenvolvedor web.",
        link: "https://developer.mozilla.org/pt-BR/",
      },
      {
        id: 6,
        nome: "React - Documentação",
        descricao:
          "Aprenda a construir interfaces de usuário modernas baseadas em componentes diretamente com a fonte.",
        link: "https://react.dev/",
      },
    ],
  },
];

function Sites() {
  return (
    <main className="sites-container container-lg">
      <div className="cabecalho-modulo">
        <h2>Sites Úteis</h2>
        <p>
          Links úteis e documentações essenciais pro aluno do curso de Sistemas
          de Informações.
        </p>
      </div>

      {catalogoSites.map((secao, index) => (
        <section key={index} className="categoria-section">
          <h3 className="categoria-titulo">
            {/* Mantive apenas o ícone do título da categoria */}
            <i
              className={`${secao.iconeSecao} titulo-icone`}
              aria-hidden="true"
            ></i>
            {secao.categoria}
          </h3>
          <div className="br-divider"></div>

          <div className="sites-grid">
            {secao.sites.map((site) => (
              <a
                key={site.id}
                href={site.link}
                target="_blank"
                rel="noopener noreferrer"
                className="br-card hover clickable-card site-card"
                aria-label={`Acessar o site ${site.nome}`}
              >
                {/* Removidos os ícones: O card agora foca apenas no conteúdo textual */}
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
