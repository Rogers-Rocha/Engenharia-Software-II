import { useState } from "react";
import "../css-classes/coordenacao.css";

const Item = ({ item }) => {
  const [mostrarContato, setMostrarContato] = useState(false);

  const toggleContato = () => {
    setMostrarContato((prev) => !prev);
  };

  return (
    <div className="item">
      <img src={item.foto} alt={item.prof} className="foto-professor" />

      <div className="conteudo">
        <p className="nome">{item.prof}</p>

        {item.trab && <p className="cargo">{item.trab}</p>}

        {/* BOTÃO CONTATO */}
        <button
          className={`btn-contato ${mostrarContato ? "ativo" : ""}`}
          onClick={toggleContato}
        >
          {mostrarContato ? "Ocultar contato" : "Contato"}
        </button>

        {/* LISTA DE CONTATOS */}
        {mostrarContato && item.contato?.length > 0 && (
          <ul className="lista-contato">
            {item.contato.map((c, index) => (
              <li key={index}>{c.nome}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Item;
