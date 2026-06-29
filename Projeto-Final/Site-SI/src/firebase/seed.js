// src/firebase/seed.js
// Execute esse arquivo UMA única vez para popular o Firestore
// Comando: node --experimental-vm-modules src/firebase/seed.js
// (ou rode via botão que criaremos na tela admin)

import { db } from "./firebase.js";
import {
  collection,
  doc,
  setDoc,
  Timestamp,
} from "firebase/firestore";

import semfoto from "../assets/semfoto.jpg";

// ─── Dados ────────────────────────────────────────────────────────────────────

const professores = [
  {
    id: "1",
    foto: semfoto,
    prof: "Alcilene Dalília de Sousa",
    sala: "Sala dos Professores 01",
    disciplinas: [
      { nome: "Algoritmos I", periodo: "1º Período" },
      { nome: "Matemática Financeira", periodo: "5º Período" },
    ],
    projetos: [
      {
        nome: "IA aplicada à educação",
        descricao:
          "Estudo sobre uso de inteligência artificial no apoio ao ensino superior, analisando desempenho acadêmico e personalização do aprendizado.",
      },
    ],
  },
  {
    id: "2",
    foto: semfoto,
    prof: "Dennis Sávio Martins da Silva",
    sala: "Sala dos Professores 01",
    disciplinas: [
      { nome: "Banco de Dados I", periodo: "3º Período" },
      { nome: "Banco de Dados II", periodo: "4º Período" },
    ],
    projetos: [
      {
        nome: "IA aplicada à educação",
        descricao:
          "Estudo sobre uso de inteligência artificial no apoio ao ensino superior, analisando desempenho acadêmico e personalização do aprendizado.",
      },
    ],
  },
  {
    id: "3",
    foto: semfoto,
    prof: "Evandro José da Rocha e Silva",
    sala: "Sala dos Professores 03",
    disciplinas: [
      { nome: "Programação para Web I", periodo: "4º Período" },
      { nome: "Programação para Web II", periodo: "5º Período" },
    ],
    projetos: [
      {
        nome: "IA aplicada à educação",
        descricao:
          "Estudo sobre uso de inteligência artificial no apoio ao ensino superior, analisando desempenho acadêmico e personalização do aprendizado.",
      },
    ],
  },
  {
    id: "4",
    foto: semfoto,
    prof: "Juliana Oliveira de Carvalho",
    sala: "Sala dos Professores 04",
    disciplinas: [{ nome: "Estrutura de Dados II", periodo: "4º Período" }],
    projetos: [
      {
        nome: "IA aplicada à educação",
        descricao:
          "Estudo sobre uso de inteligência artificial no apoio ao ensino superior, analisando desempenho acadêmico e personalização do aprendizado.",
      },
    ],
  },
  {
    id: "5",
    foto: semfoto,
    prof: "Leonardo Pio Vasconcelos",
    sala: "Sala dos Professores 05",
    disciplinas: [
      { nome: "Engenharia de Software I", periodo: "3º Período" },
      { nome: "Engenharia de Software II", periodo: "4º Período" },
      { nome: "Interação Humano Computador", periodo: "4º Período" },
    ],
    projetos: [
      {
        nome: "IA aplicada à educação",
        descricao:
          "Estudo sobre uso de inteligência artificial no apoio ao ensino superior, analisando desempenho acadêmico e personalização do aprendizado.",
      },
    ],
  },
  {
    id: "6",
    foto: semfoto,
    prof: "Patrícia Vieira da Silva Barros",
    sala: "Sala dos Professores 06",
    disciplinas: [
      { nome: "Auditoria e Segurança de Sistema de Informação", periodo: "5º Período" },
      { nome: "Ética e Legislação", periodo: "7º Período" },
    ],
    projetos: [
      {
        nome: "IA aplicada à educação",
        descricao:
          "Estudo sobre uso de inteligência artificial no apoio ao ensino superior, analisando desempenho acadêmico e personalização do aprendizado.",
      },
    ],
  },
  {
    id: "7",
    foto: semfoto,
    prof: "Frank Cézar Hipólito Luz",
    sala: "Sala dos Professores 07",
    disciplinas: [
      { nome: "Circuitos", periodo: "2º Período" },
      { nome: "Arquitetura", periodo: "3º Período" },
    ],
    projetos: [
      {
        nome: "IA aplicada à educação",
        descricao:
          "Estudo sobre uso de inteligência artificial no apoio ao ensino superior, analisando desempenho acadêmico e personalização do aprendizado.",
      },
    ],
  },
  {
    id: "8",
    foto: semfoto,
    prof: "Rayner Sousa Carvalho",
    sala: "Sala dos Professores 08",
    disciplinas: [
      { nome: "Redes de Computadores I", periodo: "4º Período" },
      { nome: "Redes de Computadores II", periodo: "5º Período" },
    ],
    projetos: [
      {
        nome: "IA aplicada à educação",
        descricao:
          "Estudo sobre uso de inteligência artificial no apoio ao ensino superior, analisando desempenho acadêmico e personalização do aprendizado.",
      },
    ],
  },
];

const coordenacao = [
  {
    id: "1",
    foto: semfoto,
    prof: "Frank Cézar Hipólito Luz",
    trab: "Coordenador",
    contato: [{ nome: "frankcezar@gmail.com", tipo: "" }],
  },
  {
    id: "2",
    foto: semfoto,
    prof: "Rayner Sousa Carvalho",
    trab: "Sub-Coordenador",
    contato: [{ nome: "raynersousa@gmail.com", tipo: "" }],
  },
];

const laboratorios = [
  {
    id: "1",
    nome: "Laboratório 1",
    status: "Laboratório Disponível",
    localizacao: "Localização: sala 813",
  },
  {
    id: "2",
    nome: "Laboratório 2",
    status: "Laboratório Indisponível",
    localizacao: "Localização: sala 814",
  },
  {
    id: "3",
    nome: "PASID",
    status: "Laboratório Disponível",
    localizacao: "Localização: Primeira sala à esquerda no bloco de enfermagem",
  },
  {
    id: "4",
    nome: "PAAD",
    status: "Laboratório Disponível",
    localizacao: "Localização: Segunda sala no bloco de enfermagem",
  },
];

const eventos = [
  {
    id: "1",
    nome: "SINFO - Simpósio de Sistemas de Informação",
    descricao:
      "O principal evento anual do curso de S.I. da UFPI/CSHNB. Conta com palestras de especialistas do mercado, minicursos práticos, maratona de programação e submissão de artigos científicos.",
    inscricaoInicio: Timestamp.fromDate(new Date(2026, 7, 1)),
    inscricaoFim:    Timestamp.fromDate(new Date(2026, 7, 15)),
    dataInicio:      Timestamp.fromDate(new Date(2026, 7, 20)),
    dataFim:         Timestamp.fromDate(new Date(2026, 7, 23)),
    linkInscricao: "https://sigeventos.ufpi.br/evento/sinfo2026",
  },
  {
    id: "2",
    nome: "StartUFPI",
    descricao:
      "Evento voltado para inovação e empreendedorismo universitário. Equipes de alunos montam modelos de negócios para startups e apresentam para bancas de investidores e professores.",
    inscricaoInicio: Timestamp.fromDate(new Date(2026, 8, 10)),
    inscricaoFim:    Timestamp.fromDate(new Date(2026, 8, 30)),
    dataInicio:      Timestamp.fromDate(new Date(2026, 9, 5)),
    dataFim:         Timestamp.fromDate(new Date(2026, 9, 7)),
    linkInscricao: "https://sigeventos.ufpi.br/evento/startufpi",
  },
  {
    id: "3",
    nome: "Hack the Data - UFPI",
    descricao:
      "Um Hackathon intensivo de 48 horas focado em Ciência de Dados e Inteligência Artificial. Resolva problemas reais da região de Picos utilizando grandes volumes de dados.",
    inscricaoInicio: Timestamp.fromDate(new Date(2026, 4, 1)),
    inscricaoFim:    Timestamp.fromDate(new Date(2026, 4, 30)),
    dataInicio:      Timestamp.fromDate(new Date(2026, 4, 31)),
    dataFim:         Timestamp.fromDate(new Date(2026, 5, 5)),
    linkInscricao: "https://sigeventos.ufpi.br/evento/hackthedata",
  },
];

const noticias = [
  {
    id: "1",
    categoria: "Calendário Acadêmico",
    dataPublicacao: Timestamp.fromDate(new Date(2026, 4, 25)),
    titulo: "Período de Matrículas para o Semestre 2026.2",
    resumo:
      "Atenção, discentes! O sistema SIGAA estará aberto para matrículas curriculares na próxima semana. Confira o edital e não perca os prazos.",
    imagem: "https://placehold.co/600x300/1351b4/ffffff?text=Matriculas+Abertas",
    link: "https://noticias.ufpi.br/12345",
  },
  {
    id: "2",
    categoria: "Manutenção",
    dataPublicacao: Timestamp.fromDate(new Date(2026, 5, 1)),
    titulo: "Desligamento Programado de Energia no CSHNB",
    resumo:
      "A Equatorial informou que haverá manutenção na rede elétrica do campus neste sábado. Os laboratórios de informática estarão indisponíveis.",
    imagem: "https://placehold.co/600x300/e0e0e0/333333?text=Aviso+de+Manutencao",
    link: "https://noticias.ufpi.br/12345",
  },
  {
    id: "3",
    categoria: "Comunidade",
    dataPublicacao: Timestamp.fromDate(new Date(2026, 5, 2)),
    titulo: "Alunos de S.I. lançam novo app para Restaurante Universitário",
    resumo:
      "Projeto de extensão desenvolvido por alunos do 6º período visa facilitar a compra de fichas e visualização do cardápio do RU via smartphone.",
    imagem: "https://placehold.co/600x300/0b7a39/ffffff?text=App+do+RU",
    link: "https://noticias.ufpi.br/12345",
  },
  {
    id: "4",
    categoria: "Eventos",
    dataPublicacao: Timestamp.fromDate(new Date(2026, 5, 5)),
    titulo: "Defesas de TCC: Confira a agenda da semana",
    resumo:
      "As defesas públicas de Trabalho de Conclusão de Curso começam hoje. Os eventos ocorrerão no Auditório e são abertos a todos os estudantes.",
    imagem: "https://placehold.co/600x300/b35900/ffffff?text=Defesas+de+TCC",
    link: "https://noticias.ufpi.br/12345",
  },
];

const livros = [
  {
    id: "1",
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
    id: "2",
    categoria: "Programação em Python",
    livros: [
      {
        id: 3,
        titulo: "Python Fluente",
        autor: "Luciano Ramalho",
        imagem: "https://placehold.co/200x300/e0e0e0/333333?text=Python+Fluente",
        link: "https://www.amazon.com.br/dp/8543004838",
      },
      {
        id: 4,
        titulo: "Python Simplificado",
        autor: "Eric Matthes",
        imagem: "https://placehold.co/200x300/e0e0e0/333333?text=Python+Simplificado",
        link: "https://www.amazon.com.br/dp/8543004838",
      },
      {
        id: 5,
        titulo: "Automatize Tarefas Maçantes com Python",
        autor: "Al Sweigart",
        imagem: "https://placehold.co/200x300/e0e0e0/333333?text=Automatize+Python",
        link: "https://www.amazon.com.br/dp/8543004838",
      },
    ],
  },
];

const sites = [
  {
    id: "1",
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
    id: "2",
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
    id: "3",
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

const socials = [
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

// ─── Função de seed ───────────────────────────────────────────────────────────

const popularColecao = async (nomeColecao, dados) => {

    if (!dados || dados.length === 0) {
        console.log(`⚠️ Ignorando ${nomeColecao}: dados não definidos neste arquivo.`);
        return;
    } 

  console.log(`⏳ Populando coleção: ${nomeColecao}...`);
  for (const item of dados) {
    const { id, ...campos } = item;
    await setDoc(doc(collection(db, nomeColecao), id), campos);
  }
  console.log(`✅ ${nomeColecao} — ${dados.length} documento(s) criados`);
};

export const executarSeed = async () => {
  try {
    // Se as variáveis abaixo (professores, eventos...) estiverem declaradas em outro arquivo,
    // garanta que passem dados válidos ou comente as linhas para testar apenas as que possui aqui.
    if (typeof professores !== 'undefined') await popularColecao("professores", professores);
    if (typeof coordenacao !== 'undefined') await popularColecao("coordenacao", coordenacao);
    if (typeof laboratorios !== 'undefined') await popularColecao("laboratorios", laboratorios);
    if (typeof eventos !== 'undefined') await popularColecao("eventos", eventos);
    if (typeof noticias !== 'undefined') await popularColecao("noticias", noticias);
    if (typeof livros !== 'undefined') await popularColecao("livros", livros);
    
    // Executa as coleções locais deste arquivo
    await popularColecao("sites", sites);
    await popularColecao("socials", socials);

    console.log("🎉 Seed completo! Todas as coleções foram populadas.");
    return { sucesso: true };
  } catch (error) {
    console.error("❌ Erro durante o seed:", error);
    return { sucesso: false, erro: error.message };
  }
};