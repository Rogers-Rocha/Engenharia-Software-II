import { useState } from "react";

import "./App.css";
import "./css-classes/laboratorio.css";

import Item from "./componentes/itemLab.jsx";

function Laboratorios() {
  const [items] = useState([
    {
      id: 1,
      nome: "Laboratório 1",
      status: "Laboratório Disponível",
      localizacao: "813",
    },
    {
      id: 2,
      nome: "Laboratório 2",
      status: "Laboratório Indisponível",
      localizacao: "814",
    },
    {
      id: 3,
      nome: "PAAD",
      status: "Laboratório Disponível",
      localizacao: "Segunda sala do bloco de enfermagem",
    },
    {
      id: 4,
      nome: "PASID",
      status: "Laboratório Disponível",
      localizacao: "Primeira sala à esquerda do bloco de enfermagem",
    },
  ]);

  return (
    <div className="laboratorios">
      <h2>Lista de laboratórios</h2>

      <div className="descricao-laboratorios">
        <p>
          Os laboratórios do Curso de Sistemas de Informação destinam-se a alunos que necessitam de um ambiente adequado para estudos, especialmente aqueles que não dispõem, em suas residências, de recursos como quadro branco e/ou computadores.
        </p>
        <br />
        <br />
        <p>
          Os Núcleos de Pesquisa são laboratórios destinados para aqueles estudantes de Sistemas de Informação que fazem parte de algum projeto de pesquisa.
        </p>
      </div>

      <div className="item-lista">
        {items.map((item) => (
          // Seguindo a mesma estrutura, o objeto 'item' é passado como propriedade para o componente Item
          <Item key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default Laboratorios;