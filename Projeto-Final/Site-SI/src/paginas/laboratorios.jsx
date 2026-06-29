// src/paginas/laboratorios.jsx
import "../App.css";
import "../css-classes/laboratorios.css";

import Item from "../componentes/itemLab.jsx";
import { useColecao } from "../firebase/useColecao.js";
import { Carregando, ErroCarregamento } from "../componentes/estadoPagina.jsx";

function Laboratorios() {
  const { dados, carregando, erro } = useColecao("laboratorios", "nome");

  if (carregando) return <Carregando mensagem="Carregando laboratórios..." />;
  if (erro)       return <ErroCarregamento />;

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
        {dados.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default Laboratorios;