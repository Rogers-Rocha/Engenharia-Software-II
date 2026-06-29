// src/paginas/professores.jsx
import "../App.css";
import "../css-classes/professor.css";

import Item from "../componentes/itemProf.jsx";
import { useColecao } from "../firebase/useColecao.js";
import { Carregando, ErroCarregamento } from "../componentes/estadoPagina.jsx";

function Professores() {
  const { dados, carregando, erro } = useColecao("professores", "prof");

  if (carregando) return <Carregando mensagem="Carregando professores..." />;
  if (erro)       return <ErroCarregamento />;

  return (
    <div className="professores">
      <h2>Lista de professores</h2>
      <div className="item-lista">
        {dados.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}

export default Professores;