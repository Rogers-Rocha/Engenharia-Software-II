import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import AdminModal from "../componentes/adminModal";

describe("AdminModal Component", () => {
  const mockSchema = {
    raiz: { titulo: "string", imagem: "string", itens: "array" },
    sub: { itens: { subTitulo: "string" } },
    layout: [
      { type: "single", campo: "titulo" },
      { type: "single", campo: "imagem" },
      { type: "single", campo: "itens" },
    ],
    layoutSub: { itens: [{ type: "single", campo: "subTitulo" }] },
    ordemSub: { itens: ["subTitulo"] },
  };

  const mockFormData = {
    titulo: "Notícia Inicial",
    imagem: "",
    itens: [],
  };

  const mockFormatLabel = (s) => s.toUpperCase();

  it("deve mapear a renderização dos inputs baseados no layout e IDs do formulário", () => {
    const { container } = render(
      <AdminModal
        docEditando={null}
        schema={mockSchema}
        formData={mockFormData}
        carregando={false}
        salvarDoc={vi.fn()}
        fecharModal={vi.fn()}
        handleChange={vi.fn()}
        handleArrChange={vi.fn()}
        rmArrItem={vi.fn()}
        addArrItem={vi.fn()}
        formatLabel={mockFormatLabel}
        handleUpload={vi.fn()}
      />,
    );

    expect(screen.getByText("Novo")).toBeInTheDocument();

    const inputTitulo = container.querySelector("#titulo");
    expect(inputTitulo).toBeInTheDocument();
    expect(inputTitulo.value).toBe("Notícia Inicial");

    expect(screen.getByText("Selecionar Imagem")).toBeInTheDocument();
  });

  it("deve acionar o fechamento se houver clique fora do container do modal.", () => {
    const fecharModalSpy = vi.fn();
    render(
      <AdminModal
        docEditando={null}
        schema={mockSchema}
        formData={mockFormData}
        carregando={false}
        salvarDoc={vi.fn()}
        fecharModal={fecharModalSpy}
        handleChange={vi.fn()}
        handleArrChange={vi.fn()}
        rmArrItem={vi.fn()}
        addArrItem={vi.fn()}
        formatLabel={mockFormatLabel}
        handleUpload={vi.fn()}
      />,
    );

    const overlay = document.querySelector(".admin-modal-overlay");
    fireEvent.mouseDown(overlay);
    expect(fecharModalSpy).toHaveBeenCalled();
  });

  it("deve permitir a adição de blocos de arrays quando o botão for clicado", () => {
    const addArrItemSpy = vi.fn();
    render(
      <AdminModal
        docEditando={null}
        schema={mockSchema}
        formData={mockFormData}
        carregando={false}
        salvarDoc={vi.fn()}
        fecharModal={vi.fn()}
        handleChange={vi.fn()}
        handleArrChange={vi.fn()}
        rmArrItem={vi.fn()}
        addArrItem={addArrItemSpy}
        formatLabel={mockFormatLabel}
        handleUpload={vi.fn()}
      />,
    );

    const btnAdd = screen.getByText(/Adicionar ITENS/i);
    fireEvent.click(btnAdd);
    expect(addArrItemSpy).toHaveBeenCalledWith("itens");
  });
});
