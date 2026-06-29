import { useState } from "react";

import "../App.css";
import "../css-classes/laboratorios.css";

import Item from "../componentes/itemLab.jsx";

// Mock de dados dos laboratórios
const items = [
  {
    id: 1,
    nome: "Laboratório 1",
    status: "Laboratório Disponível",
    localizacao: "Localização: sala 813",
  },
  {
    id: 2,
    nome: "Laboratório 2",
    status: "Laboratório Indisponível",
    localizacao: "Localização: sala 814",
  },
  {
    id: 3,
    nome: "PASID",
    status: "Laboratório Disponível",
    localizacao: "Localização: Primeira sala à esquerda no bloco de enfermagem",
  },
  {
    id: 4,
    nome: "PAAD",
    status: "Laboratório Disponível",
    localizacao: "Localização: Segunda sala no bloco de enfermagem",
  },
];

function Laboratorios() {
  return (
    <div className="laboratorios">
      <h2>Lista de laboratórios</h2>

      <div className="descricao-laboratorios">
        <p>
          Os laboratórios do Curso de Sistemas de Informação destinam-se a
          alunos que necessitam de um ambiente adequado para estudos,
          especialmente aqueles que não dispõem, em suas residências, de
          recursos como quadro branco e/ou computadores.
        </p>
        <p>
          Os Núcleos de Pesquisa são laboratórios destinados para aqueles
          estudantes de Sistemas de Informação que fazem parte de algum projeto
          de pesquisa.
        </p>
      </div>

      <div className="item-lista">
        {items.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default Laboratorios;
