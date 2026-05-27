import { useState } from "react";
import "./professor.css";

const Item = ({ item }) => {
  const [secaoAtiva, setSecaoAtiva] = useState(null);
  const [detalhesAberto, setDetalhesAberto] = useState(null);

  return (
    <div className="item">
      <img
        src={item.foto}
        alt={item.prof}
        className="foto-professor"
      />

      <div className="conteudo">
        <p>{item.prof}</p>

        {/* BOTÃO DISCIPLINAS */}
        <button
          className={`btn-disciplinas ${
            secaoAtiva === "disciplinas" ? "ativo" : ""
          }`}
          onClick={() =>
            setSecaoAtiva(
              secaoAtiva === "disciplinas" ? null : "disciplinas"
            )
          }
        >
          Disciplinas
        </button>

        {secaoAtiva === "disciplinas" &&
          item.disciplinas?.length > 0 && (
            <ul className="lista-disciplinas">
              {item.disciplinas.map((disc, index) => (
                <li key={index}>
                  {disc.nome} ({disc.periodo})
                </li>
              ))}
            </ul>
          )}

        {/* BOTÃO PROJETOS */}
        <button
          className={`btn-projetos ${
            secaoAtiva === "projetos" ? "ativo" : ""
          }`}
          onClick={() =>
            setSecaoAtiva(
              secaoAtiva === "projetos" ? null : "projetos"
            )
          }
        >
          Projetos de Pesquisa
        </button>

        {secaoAtiva === "projetos" &&
          item.projetos?.length > 0 && (
            <ul className="lista-projetos">
              {item.projetos.map((proj) => (
                <li key={proj.nome}>
                  <p>{proj.nome}</p>

                  <button
                    className="btn-detalhes"
                    onClick={() =>
                      setDetalhesAberto(
                        detalhesAberto === proj.nome
                          ? null
                          : proj.nome
                      )
                    }
                  >
                    Detalhes
                  </button>

                  {detalhesAberto === proj.nome && (
                    <p className="descricao">
                      {proj.descricao
                        ?.split(" ")
                        .slice(0, 100)
                        .join(" ")}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          )}
      </div>
    </div>
  );
};

export default Item;