import { useState } from "react";

import "../App.css";
import "../css-classes/professor.css";

import Item from "../componentes/itemProf.jsx";
import semfoto from "../assets/semfoto.jpg";

// Mock de dados dos professores
const items = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
    foto: semfoto,
    prof: "Evandro José da Rocha e Silva",
    sala: "Sala dos Professores 03",
    disciplinas: [
      { nome: "Progamação para Web I", periodo: "4º Período" },
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
    id: 4,
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
    id: 5,
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
    id: 6,
    foto: semfoto,
    prof: "Patrícia Vieira da Silva Barros",
    sala: "Sala dos Professores 06",
    disciplinas: [
      {
        nome: "Auditoria e Segurança de Sistema de Informação",
        periodo: "5º Período",
      },
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
    id: 7,
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
    id: 8,
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

function Professores() {
  return (
    <div className="professores">
      <h2>Lista de professores</h2>

      <div className="item-lista">
        {items.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}

export default Professores;
