// src/firebase/schemasColecao.js
//
// Define o "formato" de cada coleção: quais campos existem, em que ordem
// aparecem no formulário, qual o tipo de cada um e qual placeholder mostrar.
//
// Única responsabilidade: descrever dados. Não sabe nada de React, Firestore
// ou como o campo é desenhado na tela — isso fica a cargo de CampoFormulario.jsx.
//
// Tipos de campo suportados:
//   "texto"        -> <input type="text">
//   "id-numerico"  -> <input> com autocomplete do próximo ID sequencial
//   "lista-texto"  -> textarea onde cada linha é um item; campos separados por ";"
//                     (usado para disciplinas, projetos, contatos, etc.)

export const schemasColecao = {
  professores: {
    rotuloSingular: "Professor(a)",
    campos: [
      { chave: "id", tipo: "id-numerico", rotulo: "ID" },
      { chave: "prof", tipo: "texto", rotulo: "Professor(a)", placeholder: "Ex: Maria da Silva" },
      { chave: "sala", tipo: "texto", rotulo: "Sala", placeholder: "Ex: Sala dos Professores 01" },
      {
        chave: "disciplinas",
        tipo: "lista-texto",
        rotulo: "Disciplinas",
        subcampos: ["nome", "periodo"],
        placeholder:
          "Uma disciplina por linha, separando Nome e Período com ; \nEx:\nAlgoritmos I; 1º Período\nBanco de Dados I; 3º Período",
      },
      {
        chave: "projetos",
        tipo: "lista-texto",
        rotulo: "Projetos de Pesquisa",
        subcampos: ["nome", "descricao"],
        placeholder:
          "Um projeto por linha, separando Nome e Descrição com ; \nEx:\nIA aplicada à educação; Estudo sobre uso de IA no ensino superior.",
      },
    ],
  },

  coordenacao: {
    rotuloSingular: "Membro da Coordenação",
    campos: [
      { chave: "id", tipo: "id-numerico", rotulo: "ID" },
      { chave: "prof", tipo: "texto", rotulo: "Nome", placeholder: "Ex: Frank Cézar Hipólito Luz" },
      { chave: "trab", tipo: "texto", rotulo: "Cargo", placeholder: "Ex: Coordenador" },
      {
        chave: "contato",
        tipo: "lista-texto",
        rotulo: "Contatos",
        subcampos: ["nome", "tipo"],
        placeholder: "Um contato por linha, separando E-mail e Tipo com ; \nEx:\nfrankcezar@gmail.com; ",
      },
    ],
  },

  laboratorios: {
    rotuloSingular: "Laboratório",
    campos: [
      { chave: "id", tipo: "id-numerico", rotulo: "ID" },
      { chave: "nome", tipo: "texto", rotulo: "Nome do Laboratório", placeholder: "Ex: Laboratório 1" },
      { chave: "status", tipo: "texto", rotulo: "Status", placeholder: "Laboratório Disponível ou Laboratório Indisponível" },
      { chave: "localizacao", tipo: "texto", rotulo: "Localização", placeholder: "Ex: Localização: sala 813" },
    ],
  },

  eventos: {
    rotuloSingular: "Evento",
    campos: [
      { chave: "id", tipo: "id-numerico", rotulo: "ID" },
      { chave: "nome", tipo: "texto", rotulo: "Nome do Evento", placeholder: "Ex: SINFO - Simpósio de Sistemas de Informação" },
      { chave: "descricao", tipo: "texto-longo", rotulo: "Descrição", placeholder: "Descreva o evento..." },
      { chave: "inscricaoInicio", tipo: "data", rotulo: "Início das Inscrições" },
      { chave: "inscricaoFim", tipo: "data", rotulo: "Fim das Inscrições" },
      { chave: "dataInicio", tipo: "data", rotulo: "Início do Evento" },
      { chave: "dataFim", tipo: "data", rotulo: "Fim do Evento" },
      { chave: "linkInscricao", tipo: "texto", rotulo: "Link de Inscrição", placeholder: "https://..." },
    ],
  },

  noticias: {
    rotuloSingular: "Notícia",
    campos: [
      { chave: "id", tipo: "id-numerico", rotulo: "ID" },
      { chave: "categoria", tipo: "texto", rotulo: "Categoria", placeholder: "Ex: Calendário Acadêmico" },
      { chave: "dataPublicacao", tipo: "data", rotulo: "Data de Publicação" },
      { chave: "titulo", tipo: "texto", rotulo: "Título", placeholder: "Ex: Período de Matrículas para o Semestre 2026.2" },
      { chave: "resumo", tipo: "texto-longo", rotulo: "Resumo", placeholder: "Resumo da notícia..." },
      { chave: "imagem", tipo: "texto", rotulo: "URL da Imagem", placeholder: "https://..." },
      { chave: "link", tipo: "texto", rotulo: "Link da Notícia", placeholder: "https://..." },
    ],
  },

  // livros e sites têm uma categoria "pai" com uma lista de itens dentro.
  // Tratamos a lista interna (livros/sites) também como "lista-texto",
  // mas com mais subcampos.
  livros: {
    rotuloSingular: "Categoria de Livros",
    campos: [
      { chave: "id", tipo: "id-numerico", rotulo: "ID" },
      { chave: "categoria", tipo: "texto", rotulo: "Categoria", placeholder: "Ex: Banco de Dados" },
      {
        chave: "livros",
        tipo: "lista-texto",
        rotulo: "Livros desta categoria",
        subcampos: ["titulo", "autor", "imagem", "link"],
        placeholder:
          "Um livro por linha, separando Título, Autor, URL da Imagem e Link com ; \nEx:\nSistemas de Banco de Dados; Ramez Elmasri; https://...; https://...",
      },
    ],
  },

  sites: {
    rotuloSingular: "Categoria de Sites",
    campos: [
      { chave: "id", tipo: "id-numerico", rotulo: "ID" },
      { chave: "categoria", tipo: "texto", rotulo: "Categoria", placeholder: "Ex: Banco de Dados" },
      { chave: "iconeSecao", tipo: "texto", rotulo: "Ícone (Font Awesome)", placeholder: "Ex: fas fa-database" },
      {
        chave: "sites",
        tipo: "lista-texto",
        rotulo: "Sites desta categoria",
        subcampos: ["nome", "descricao", "link"],
        placeholder:
          "Um site por linha, separando Nome, Descrição e Link com ; \nEx:\nPostgreSQL - Site Oficial; Documentação oficial...; https://www.postgresql.org/",
      },
    ],
  },
};

// Helper: retorna o schema de uma coleção, ou null se ela não tiver
// formulário customizado (cai no comportamento genérico antigo)
export function obterSchema(nomeColecao) {
  return schemasColecao[nomeColecao] || null;
}
