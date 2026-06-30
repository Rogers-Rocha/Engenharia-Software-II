// src/componentes/conversoresTexto.js
//
// Funções puras (sem efeitos colaterais, sem React, sem Firebase) que convertem
// entre o texto que o admin digita na textarea e a estrutura de dados que o
// Firestore espera (array de objetos). Isolar essa lógica aqui permite testá-la
// e reutilizá-la sem depender de nenhum componente de UI (Dependency Inversion).

import { Timestamp } from "firebase/firestore";

/**
 * Converte texto multi-linha em array de objetos.
 * Cada linha vira um objeto; campos dentro da linha são separados por ";".
 *
 * Exemplo:
 *   texto:     "Algoritmos I; 1º Período\nBanco de Dados I; 3º Período"
 *   subcampos: ["nome", "periodo"]
 *   resultado: [
 *     { nome: "Algoritmos I", periodo: "1º Período" },
 *     { nome: "Banco de Dados I", periodo: "3º Período" },
 *   ]
 */
export function textoParaListaObjetos(texto, subcampos) {
  if (!texto || !texto.trim()) return [];

  return texto
    .split("\n")
    .map((linha) => linha.trim())
    .filter((linha) => linha.length > 0)
    .map((linha) => {
      const partes = linha.split(";").map((parte) => parte.trim());
      const objeto = {};
      subcampos.forEach((nomeSubcampo, indice) => {
        objeto[nomeSubcampo] = partes[indice] ?? "";
      });
      return objeto;
    });
}

/**
 * Converte array de objetos de volta em texto multi-linha (operação inversa).
 * Usado para preencher a textarea quando o admin abre o modo "editar".
 *
 * Exemplo:
 *   lista:     [{ nome: "Algoritmos I", periodo: "1º Período" }]
 *   subcampos: ["nome", "periodo"]
 *   resultado: "Algoritmos I; 1º Período"
 */
export function listaObjetosParaTexto(lista, subcampos) {
  if (!Array.isArray(lista) || lista.length === 0) return "";

  return lista
    .map((objeto) => subcampos.map((nomeSubcampo) => objeto[nomeSubcampo] ?? "").join("; "))
    .join("\n");
}

/**
 * Converte um valor de input <input type="date"> (string "YYYY-MM-DD")
 * para um Timestamp do Firestore.
 */
export function textoParaTimestamp(valorInputDate) {
  if (!valorInputDate) return null;
  const [ano, mes, dia] = valorInputDate.split("-").map(Number);
  // mes - 1 porque o construtor Date usa mês baseado em zero
  return Timestamp.fromDate(new Date(ano, mes - 1, dia));
}

/**
 * Converte um Timestamp do Firestore (ou Date) para o formato que
 * <input type="date"> espera ("YYYY-MM-DD").
 */
export function timestampParaTexto(valor) {
  if (!valor) return "";
  const data = typeof valor.toDate === "function" ? valor.toDate() : new Date(valor);
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const dia = String(data.getDate()).padStart(2, "0");
  return `${ano}-${mes}-${dia}`;
}
