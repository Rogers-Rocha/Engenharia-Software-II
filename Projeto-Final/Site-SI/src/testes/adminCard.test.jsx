import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import AdminCard from "../componentes/adminCard";

describe("AdminCard Component", () => {
  const mockSchema = {
    raiz: { nome: "string", foto: "string", cor: "string" },
    sub: {},
    layout: [
      { type: "single", campo: "nome" },
      { type: "single", campo: "foto" },
      { type: "single", campo: "cor" },
    ],
    layoutSub: {},
  };

  const mockDocItem = {
    id: "doc-123",
    nome: "Item de Teste",
    foto: "https://linkdaimagem.com/foto.jpg",
    cor: "#ff0000",
  };

  const mockFormatLabel = (s) => s.toUpperCase();
  const mockFormatDate = (v) => "01/01/2026";

  it("deve renderizar os dados do documento.", () => {
    const { container } = render(
      <AdminCard
        docItem={mockDocItem}
        schema={mockSchema}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        formatLabel={mockFormatLabel}
        formatDate={mockFormatDate}
      />,
    );

    expect(screen.getByText("Item de Teste")).toBeInTheDocument();

    const img = container.querySelector(".admin-card-img-preview");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", mockDocItem.foto);

    const colorBox = container.querySelector(".admin-card-color-box");
    expect(colorBox).toBeInTheDocument();
  });

  it("deve acionar onEdit passando o objeto inteiro quando clicado em Editar", () => {
    const onEditSpy = vi.fn();
    render(
      <AdminCard
        docItem={mockDocItem}
        schema={mockSchema}
        onEdit={onEditSpy}
        onDelete={vi.fn()}
        formatLabel={mockFormatLabel}
        formatDate={mockFormatDate}
      />,
    );

    const btnEditar = screen.getByText(/Editar/i);
    fireEvent.click(btnEditar);
    expect(onEditSpy).toHaveBeenCalledWith(mockDocItem);
  });

  it("deve acionar onDelete passando o id correspondente quando clicado em Excluir", () => {
    const onDeleteSpy = vi.fn();
    render(
      <AdminCard
        docItem={mockDocItem}
        schema={mockSchema}
        onEdit={vi.fn()}
        onDelete={onDeleteSpy}
        formatLabel={mockFormatLabel}
        formatDate={mockFormatDate}
      />,
    );

    const btnExcluir = screen.getByText(/Excluir/i);
    fireEvent.click(btnExcluir);
    expect(onDeleteSpy).toHaveBeenCalledWith("doc-123");
  });
});
