import { render } from "@testing-library/react";
import { describe, it } from "vitest";

/*
estrutura do teste:
{
  componente: <react_component>,
  descricao: <descricao do componente>,
  testes: [
    {
      descricao: <descricao do teste>,
      atributos: {<atributos_do_react_component>},
      esperado: () => {resultado_esperado_da_execucao},
    },
  ]
}
*/

export function testComp(testesObj) {
  describe(testesObj.descricao, () => {
    testesObj.testes.map((teste) => {
      it(teste.descricao, () => {
        render(<testesObj.componente {...teste.atributos} />);
        teste.esperado();
      });
    });
  });
}
