// src/paginas/coordenacao.jsx
import "../App.css";
import "../css-classes/coordenacao.css";

import Item from "../componentes/itemCoord.jsx";
import semfoto from "../assets/semfoto.jpg";
import { useColecao } from "../firebase/useColecao.js";
import { Carregando, ErroCarregamento } from "../componentes/estadoPagina.jsx";

function Coordenacao() {
  const { dados, carregando, erro } = useColecao("coordenacao", "prof");

  if (carregando) return <Carregando mensagem="Carregando coordenação..." />;
  if (erro)       return <ErroCarregamento />;

  // Como as fotos ainda são locais, reinjeta semfoto nos itens vindos do Firestore
  const itensComFoto = dados.map((item) => ({ ...item, foto: semfoto }));

  return (
    <div className="coordenacao">
      <h2>Coordenação</h2>
      <div className="item-lista">
        {itensComFoto.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default Coordenacao;