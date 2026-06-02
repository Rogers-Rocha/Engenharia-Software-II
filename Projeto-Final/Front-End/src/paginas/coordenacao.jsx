import "../App.css";
import "../css-classes/coordenacao.css";

import Item from "../componentes/itemCoord.jsx";
import semfoto from "../assets/semfoto.jpg";

// Mock de dados da coordenação do curso
const items = [
  {
    id: 1,
    foto: semfoto,
    prof: "Frank Cézar Hipólito Luz",
    trab: "Coordenador",
    contato: [{ nome: "frankcezar@gmail.com", tipo: "" }],
  },
  {
    id: 2,
    foto: semfoto,
    prof: "Rayner Sousa Carvalho",
    trab: "Sub-Coordenador",
    contato: [{ nome: "raynersousa@gmail.com", tipo: "" }],
  },
];

function Coordenacao() {
  return (
    <div className="coordenacao">
      <h2>Coordenação</h2>

      <div className="item-lista">
        {items.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default Coordenacao;
