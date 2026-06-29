import { screen } from "@testing-library/react";
import { expect } from "vitest";
import { testComp } from "./testComp.jsx";

import Item from "../componentes/itemLab.jsx";

const teste = {
  componente: Item,
  descricao: "Item unitário de Laboratório",
  testes: [
    {
      descricao:
        "deve renderizar o laboratório como disponível e com a classe equivalente",
      atributos: {
        item: {
          id: 1,
          nome: "Laboratório 1",
          status: "Laboratório Disponível",
          localizacao: "Localização: sala 813",
        },
      },
      esperado: () => {
        expect(screen.getByText("Laboratório 1")).toBeInTheDocument();
        expect(screen.getByText("Localização: sala 813")).toBeInTheDocument();

        const statusElement = screen.getByText("Laboratório Disponível");
        expect(statusElement).toBeInTheDocument();
        expect(statusElement).toHaveClass("status-disponivel");
      },
    },
    {
      descricao:
        "deve renderizar o laboratório como indisponível e com a classe equivalente",
      atributos: {
        item: {
          id: 1,
          nome: "Laboratório 2",
          status: "Laboratório Indisponível",
          localizacao: "Localização: sala 815",
        },
      },
      esperado: () => {
        expect(screen.getByText("Laboratório 2")).toBeInTheDocument();
        expect(screen.getByText("Localização: sala 815")).toBeInTheDocument();

        const statusElement = screen.getByText("Laboratório Indisponível");
        expect(statusElement).toBeInTheDocument();
        expect(statusElement).toHaveClass("status-indisponivel");
      },
    },
  ],
};

testComp(teste);
