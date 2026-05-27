import { useState } from 'react'

import "./App.css";
import "./Componentes/coordenacao.css";

import Item from "./Componentes/itemCoord.jsx";
import semfoto from "./Componentes/imagens/semfoto.jpg";

function Coordenacao() {
  const [items] = useState([
    {
      id: 1,
      foto: semfoto,
      prof: "Frank Cézar Hipólito Luz",
      trab: "Coordenador",
      contato: [
        {nome: "frankcezar@gmail.com", tipo: ""},
      ]
    },
    {
      id: 2,
      foto: semfoto,
      prof: "Rayner Sousa Carvalho",
      trab: "Sub-Coordenador",
      contato: [
        {nome: "raynersousa@gmail.com", tipo: ""},
      ]
    },
  ]);

  return (
  <div className="coordenacao">
    <h1>Coordenação</h1>

    <div className="item-lista">
      {items.map((item) => (
        // No componente Twodu, a propriedade (ou objeto) Twodu tem o valor twodu
        <Item item={item} />
      ))}
    </div>
  </div>
);
}

export default Coordenacao
