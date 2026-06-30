import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Admin from "../paginas/admin";

vi.mock("firebase/firestore", () => ({
  collection: vi.fn(),
  getDocs: vi.fn(),
  addDoc: vi.fn(),
  updateDoc: vi.fn(),
  deleteDoc: vi.fn(),
  doc: vi.fn(),
  Timestamp: {
    fromDate: vi.fn((date) => ({ seconds: date.getTime() / 1000 })),
  },
}));

vi.mock("firebase/auth", () => ({
  signOut: vi.fn(() => Promise.resolve()),
}));

vi.mock("../firebase/firebase", () => ({
  db: {},
  auth: {},
}));

import { getDocs, addDoc, deleteDoc } from "firebase/firestore";

describe("Admin Lifecycle & Firestore Integrations", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(window, "confirm").mockImplementation(() => true);
    vi.spyOn(window, "alert").mockImplementation(() => {});
  });

  const mockDocsCollection = {
    docs: [
      {
        id: "id-firestore-123",
        data: () => ({
          titulo: "Noticia Principal de Teste",
          imagem: "https://dominio.com/foto.jpg",
          dataPublicacao: "2026-06-30",
        }),
      },
    ],
  };

  it("READ: deve buscar a lista de documentos e gerar o schema dinamicamente.", async () => {
    vi.mocked(getDocs).mockResolvedValue(mockDocsCollection);

    render(<Admin setPagina={vi.fn()} />);

    await waitFor(() => {
      expect(getDocs).toHaveBeenCalled();
    });

    expect(screen.getByText("Noticia Principal de Teste")).toBeInTheDocument();
  });

  it("CREATE: deve ser capaz de abrir o formulário dinâmico e submeter o payload.", async () => {
    vi.mocked(getDocs).mockResolvedValue(mockDocsCollection);
    vi.mocked(addDoc).mockResolvedValue({ id: "new-id" });

    const { container } = render(<Admin setPagina={vi.fn()} />);

    await waitFor(() => {
      expect(screen.getByText("Noticia Principal de Teste")).toBeInTheDocument();
    });

    const btnNovo = screen.getByText(/Novo/i);
    fireEvent.click(btnNovo);

    const inputTitulo = container.querySelector("#titulo");
    expect(inputTitulo).toBeInTheDocument();

    fireEvent.change(inputTitulo, { target: { value: "Uma Nova Notícia Incrível" } });

    const btnSalvar = screen.getByText("Salvar");
    fireEvent.click(btnSalvar);

    await waitFor(() => {
      expect(addDoc).toHaveBeenCalled();
    });
  });

  it("DELETE: deve deletar o registro após confirmação do usuário.", async () => {
    vi.mocked(getDocs).mockResolvedValue(mockDocsCollection);
    vi.mocked(deleteDoc).mockResolvedValue();

    render(<Admin setPagina={vi.fn()} />);

    await waitFor(() => {
      expect(screen.getByText("Noticia Principal de Teste")).toBeInTheDocument();
    });

    const btnExcluir = screen.getByText(/Excluir/i);
    fireEvent.click(btnExcluir);

    expect(window.confirm).toHaveBeenCalledWith("Tem certeza que deseja excluir?");

    await waitFor(() => {
      expect(deleteDoc).toHaveBeenCalled();
    });
  });

  it("UPLOAD: deve enviar imagem usando multipart/form-data para api externa.", async () => {
    vi.mocked(getDocs).mockResolvedValue(mockDocsCollection);

    const fetchSpy = vi.spyOn(global, "fetch").mockResolvedValue({
      json: () =>
        Promise.resolve({
          success: true,
          data: { url: "https://imgbb.com/imagem-mockada.png" },
        }),
    });

    const { container } = render(<Admin setPagina={vi.fn()} />);
    await waitFor(() => expect(screen.getByText("Noticia Principal de Teste")).toBeInTheDocument());

    fireEvent.click(screen.getByText(/Novo/i));

    const inputFile = container.querySelector("input[type='file']");
    const blob = new File(["mock_data"], "foto.jpg", { type: "image/jpeg" });

    fireEvent.change(inputFile, { target: { files: [blob] } });

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalled();
    });
  });
});
