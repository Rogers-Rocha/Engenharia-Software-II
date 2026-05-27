import { useState } from 'react'

import "./App.css";
import "./Componentes/professor.css";

import Todo from "./Componentes/Todo.jsx";
import semfoto from "./Componentes/imagens/semfoto.jpg";

function Professores() {
  const [todos] = useState([
    {
      id: 1,
      foto: semfoto,
      prof: "Alcilene Dalília de Sousa",
      disciplinas: [
        {nome: "Algoritmos I", periodo: "1º Período"},
        {nome: "Matemática Financeira", periodo: "5º Período"}
      ],
      projetos: [
        {
      nome: "IA aplicada à educação",
      descricao: "Estudo sobre uso de inteligência artificial no apoio ao ensino superior, analisando desempenho acadêmico e personalização do aprendizado."}
      ]
      
    },
    {
      id: 2,
      foto: semfoto,
      prof: "Dennis Sávio Martins da Silva",
      disciplinas: [
        {nome: "Banco de Dados I", periodo: "3º Período"},
        {nome: "Banco de Dados II", periodo: "4º Período"}
      ],
      projetos: [
        {
      nome: "IA aplicada à educação",
      descricao: "Estudo sobre uso de inteligência artificial no apoio ao ensino superior, analisando desempenho acadêmico e personalização do aprendizado."}
      ]
    },
    {
      id: 3,
      foto: semfoto,
      prof: "Evandro José da Rocha e Silva",
      disciplinas: [
        {nome: "Progamação para Web I", periodo: "4º Período"},
        {nome: "Programação para Web II", periodo: "5º Período"}
      ],
      projetos: [
        {
      nome: "IA aplicada à educação",
      descricao: "Estudo sobre uso de inteligência artificial no apoio ao ensino superior, analisando desempenho acadêmico e personalização do aprendizado."}
      ]
    },
    {
      id: 4,
      foto: semfoto,
      prof: "Juliana Oliveira de Carvalho",
      disciplinas: [
        {nome: "Estrutura de Dados II", periodo: "4º Período"},
      ],
      projetos: [
        {
      nome: "IA aplicada à educação",
      descricao: "Estudo sobre uso de inteligência artificial no apoio ao ensino superior, analisando desempenho acadêmico e personalização do aprendizado."}
      ]
    },
    {
      id: 5,
      foto: semfoto,
      prof: "Leonardo Pio Vasconcelos",
      disciplinas: [
        {nome: "Engenharia de Software I", periodo: "3º Período"},
        {nome: "Engenharia de Software II", periodo: "4º Período"},
        {nome: "Interação Humano Computador", periodo: "4º Período"}
      ],
      projetos: [
        {
      nome: "IA aplicada à educação",
      descricao: "Estudo sobre uso de inteligência artificial no apoio ao ensino superior, analisando desempenho acadêmico e personalização do aprendizado."}
      ]
    },
    {
      id: 6,
      foto: semfoto,
      prof: "Patrícia Vieira da Silva Barros",
      disciplinas: [
        {nome: "Auditoria e Segurança de Sistema de Informação", periodo: "5º Período"},
        {nome: "Ética e Legislação", periodo: "7º Período"}
      ],
      projetos: [
        {
      nome: "IA aplicada à educação",
      descricao: "Estudo sobre uso de inteligência artificial no apoio ao ensino superior, analisando desempenho acadêmico e personalização do aprendizado."}
      ],
    },
  ]);

  return (
  <div className="professores">
    <h1>Lista de professores</h1>

    <div className="todo-lista">
      {todos.map((todo) => (
        // No componente Twodu, a propriedade (ou objeto) Twodu tem o valor twodu
        <Todo todo={todo} />
      ))}
    </div>
  </div>
);
}

export default Professores
