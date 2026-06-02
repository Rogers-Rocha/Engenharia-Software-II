import "../App.css";
import "../css-classes/noticias.css";

// Mock de dados: Notícias e Avisos do Campus
const mockNoticias = [
  {
    id: 1,
    categoria: "Calendário Acadêmico",
    dataPublicacao: new Date(2026, 4, 25), // 25/05/2026
    titulo: "Período de Matrículas para o Semestre 2026.2",
    resumo:
      "Atenção, discentes! O sistema SIGAA estará aberto para matrículas curriculares na próxima semana. Confira o edital e não perca os prazos.",
    imagem:
      "https://placehold.co/600x300/1351b4/ffffff?text=Matriculas+Abertas",
    link: "https://noticias.ufpi.br/12345",
  },
  {
    id: 2,
    categoria: "Manutenção",
    dataPublicacao: new Date(2026, 5, 1), // 01/06/2026
    titulo: "Desligamento Programado de Energia no CSHNB",
    resumo:
      "A Equatorial informou que haverá manutenção na rede elétrica do campus neste sábado. Os laboratórios de informática estarão indisponíveis.",
    imagem:
      "https://placehold.co/600x300/e0e0e0/333333?text=Aviso+de+Manutencao",
    link: "https://noticias.ufpi.br/12345",
  },
  {
    id: 3,
    categoria: "Comunidade",
    dataPublicacao: new Date(2026, 5, 2), // 02/06/2026
    titulo: "Alunos de S.I. lançam novo app para Restaurante Universitário",
    resumo:
      "Projeto de extensão desenvolvido por alunos do 6º período visa facilitar a compra de fichas e visualização do cardápio do RU via smartphone.",
    imagem: "https://placehold.co/600x300/0b7a39/ffffff?text=App+do+RU",
    link: "https://noticias.ufpi.br/12345",
  },
  {
    id: 4,
    categoria: "Eventos",
    dataPublicacao: new Date(2026, 5, 5), // 05/06/2026
    titulo: "Defesas de TCC: Confira a agenda da semana",
    resumo:
      "As defesas públicas de Trabalho de Conclusão de Curso começam hoje. Os eventos ocorrerão no Auditório e são abertos a todos os estudantes.",
    imagem: "https://placehold.co/600x300/b35900/ffffff?text=Defesas+de+TCC",
    link: "https://noticias.ufpi.br/12345",
  },
];

// Helper para formatar a data de publicação
const formatarData = (dataBase) => {
  return dataBase.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long", // Ex: "01 de junho"
    year: "numeric",
  });
};

function Noticias() {
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
        {mockNoticias.map((noticia) => (
          <a
            key={noticia.id}
            href={noticia.link}
            target="_blank"
            className="br-card noticia-card clickable-card"
            aria-label={`Ler notícia: ${noticia.titulo}`}
          >
            {/* Imagem de Capa da Notícia */}
            <div className="noticia-imagem">
              <img
                src={noticia.imagem}
                alt={`Capa da notícia sobre ${noticia.categoria}`}
              />
            </div>

            {/* Conteúdo da Notícia */}
            <div className="noticia-body">
              <div className="noticia-meta">
                <span className="noticia-categoria">{noticia.categoria}</span>
                <span className="noticia-data">
                  {formatarData(noticia.dataPublicacao)}
                </span>
              </div>

              <h3 className="noticia-titulo">{noticia.titulo}</h3>
              <p className="noticia-resumo">{noticia.resumo}</p>
            </div>
          </a>
        ))}
      </div>
    </main>
  );
}

export default Noticias;
