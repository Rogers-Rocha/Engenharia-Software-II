// src/componentes/CampoFormulario.jsx
//
// Responsabilidade única: dado a definição de UM campo (vinda do schema) e seu
// valor atual, decide QUAL input renderizar (texto, textarea, data, id com
// autocomplete) e dispara onChange com o valor já no formato certo.
//
// Não sabe nada sobre a coleção inteira, nem sobre Firestore — apenas sobre
// como desenhar um campo. Isso permite trocar a forma de exibir um tipo de
// campo (ex: trocar textarea por outro componente no futuro) sem tocar em
// FormularioDinamico nem nos schemas.

import {
  textoParaListaObjetos,
  listaObjetosParaTexto,
  textoParaTimestamp,
  timestampParaTexto,
} from "../componentes/conversoresTexto.js";

function CampoFormulario({ definicaoCampo, valor, aoMudar, proximoId, modo }) {
  const { chave, tipo, rotulo, placeholder, subcampos } = definicaoCampo;

  // ─── Campo ID com autocomplete do próximo número sequencial ───────────────
  if (tipo === "id-numerico") {
    return (
      <div className="form-group">
        <label htmlFor={`campo-${chave}`}>{rotulo}</label>
        <input
          id={`campo-${chave}`}
          type="text"
          value={valor ?? ""}
          // No modo criar, sugere o próximo ID como autocomplete do navegador
          // e também já preenche o valor, para o usuário não digitar à toa
          onChange={(e) => aoMudar(chave, e.target.value)}
          placeholder={modo === "criar" ? `Sugestão: ${proximoId}` : ""}
          autoComplete="off"
          list={`sugestoes-${chave}`}
          disabled={modo === "editar"} // ID nunca muda depois de criado
          required
        />
        {/* datalist alimenta o autocomplete nativo do navegador com a sugestão */}
        <datalist id={`sugestoes-${chave}`}>
          <option value={proximoId} />
        </datalist>
      </div>
    );
  }

  // ─── Campo de texto simples (uma linha) ────────────────────────────────────
  if (tipo === "texto") {
    return (
      <div className="form-group">
        <label htmlFor={`campo-${chave}`}>{rotulo}</label>
        <input
          id={`campo-${chave}`}
          type="text"
          value={valor ?? ""}
          onChange={(e) => aoMudar(chave, e.target.value)}
          placeholder={placeholder}
          required
        />
      </div>
    );
  }

  // ─── Campo de texto longo (descrições, resumos) ────────────────────────────
  if (tipo === "texto-longo") {
    return (
      <div className="form-group">
        <label htmlFor={`campo-${chave}`}>{rotulo}</label>
        <textarea
          id={`campo-${chave}`}
          value={valor ?? ""}
          onChange={(e) => aoMudar(chave, e.target.value)}
          placeholder={placeholder}
          rows="4"
        />
      </div>
    );
  }

  // ─── Campo de data ──────────────────────────────────────────────────────────
  if (tipo === "data") {
    return (
      <div className="form-group">
        <label htmlFor={`campo-${chave}`}>{rotulo}</label>
        <input
          id={`campo-${chave}`}
          type="date"
          value={timestampParaTexto(valor)}
          onChange={(e) => aoMudar(chave, textoParaTimestamp(e.target.value))}
          required
        />
      </div>
    );
  }

  // ─── Lista de objetos digitada como texto (disciplinas, projetos, etc.) ──
  if (tipo === "lista-texto") {
    // O valor interno (campos[chave]) é sempre o array de objetos.
    // Convertemos para texto só na hora de exibir na textarea.
    const valorComoTexto = Array.isArray(valor)
      ? listaObjetosParaTexto(valor, subcampos)
      : (valor ?? "");

    return (
      <div className="form-group">
        <label htmlFor={`campo-${chave}`}>{rotulo}</label>
        <textarea
          id={`campo-${chave}`}
          className="textarea-lista"
          value={valorComoTexto}
          onChange={(e) =>
            // Guarda o texto cru durante a digitação (evita perder o cursor
            // tentando reconverter a cada tecla); a conversão final para
            // array acontece no submit do formulário (ver FormularioDinamico)
            aoMudar(chave, e.target.value, /* bruto */ true)
          }
          placeholder={placeholder}
          rows="5"
        />
        <small className="dica-campo">
          Campos separados por ponto e vírgula ( ; ), um item por linha.
        </small>
      </div>
    );
  }

  // Fallback de segurança — não deveria acontecer se o schema estiver correto
  return null;
}

export default CampoFormulario;
