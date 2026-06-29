import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase/firebase.js";
import { useColecao } from "../firebase/useColecao.js";

import "../App.css";
import "../css-classes/admin.css";

// --- Subcomponente que cuida do CRUD de uma coleção selecionada ---
function PainelColecao({ nomeColecao }) {
  const { dados, carregando, erro } = useColecao(nomeColecao);
  const [itens, setItens] = useState([]);

  // Sincroniza dados do banco com o estado local para atualizar a interface rapidamente
  useEffect(() => {
    if (dados) setItens(dados);
  }, [dados]);

  const [modalAberto, setModalAberto] = useState(false);
  const [modo, setModo] = useState("criar"); // "criar" | "editar"
  const [itemAtual, setItemAtual] = useState(null);
  const [jsonDado, setJsonDado] = useState("");
  const [loadingAcao, setLoadingAcao] = useState(false);

  const abrirModalCriar = () => {
    setModo("criar");
    setItemAtual(null);
    setJsonDado("{\n  \n}"); // Template de JSON vazio
    setModalAberto(true);
  };

  const abrirModalEditar = (item) => {
    setModo("editar");
    setItemAtual(item);
    // Removemos o "id" do JSON para que o administrador não o edite sem querer
    const { id, ...resto } = item;
    setJsonDado(JSON.stringify(resto, null, 2));
    setModalAberto(true);
  };

  const salvarDocumento = async () => {
    setLoadingAcao(true);
    try {
      const objAtualizado = JSON.parse(jsonDado); // Converte o texto para objeto

      if (modo === "criar") {
        const docRef = await addDoc(collection(db, nomeColecao), objAtualizado);
        setItens([...itens, { id: docRef.id, ...objAtualizado }]);
        alert("Documento criado com sucesso!");
      } else {
        const docRef = doc(db, nomeColecao, itemAtual.id);
        await updateDoc(docRef, objAtualizado);
        setItens(
          itens.map((i) =>
            i.id === itemAtual.id ? { id: itemAtual.id, ...objAtualizado } : i,
          ),
        );
        alert("Documento atualizado com sucesso!");
      }
      setModalAberto(false);
    } catch (error) {
      alert(
        "Erro ao salvar: Verifique se o formato JSON está correto e válido.\n\nDetalhes: " +
          error.message,
      );
    } finally {
      setLoadingAcao(false);
    }
  };

  const excluirDocumento = async (id) => {
    if (
      !window.confirm("Tem certeza absoluta que deseja excluir este documento?")
    )
      return;
    try {
      await deleteDoc(doc(db, nomeColecao, id));
      setItens(itens.filter((i) => i.id !== id));
      alert("Documento excluído com sucesso!");
    } catch (error) {
      alert("Erro ao excluir documento: " + error.message);
    }
  };

  if (carregando)
    return (
      <div className="admin-loading">
        <i className="fas fa-spinner fa-spin"></i> Carregando coleção{" "}
        {nomeColecao}...
      </div>
    );
  if (erro)
    return (
      <div className="admin-error">
        <i className="fas fa-exclamation-triangle"></i> Erro: {erro}
      </div>
    );

  return (
    <div className="colecao-container">
      <div className="colecao-header">
        <h3>
          Gerenciando: <span>{nomeColecao}</span>
        </h3>
        <button className="btn-adicionar" onClick={abrirModalCriar}>
          <i className="fas fa-plus"></i> Novo Documento
        </button>
      </div>

      {itens.length === 0 ? (
        <p className="sem-dados">
          Nenhum documento encontrado na coleção <strong>{nomeColecao}</strong>.
        </p>
      ) : (
        <ul className="lista-documentos">
          {itens.map((item) => (
            <li key={item.id} className="documento-item">
              <div className="documento-info">
                <strong>ID: {item.id}</strong>
                <pre className="documento-preview">
                  {JSON.stringify(item, null, 2).slice(0, 120)}...
                </pre>
              </div>
              <div className="documento-acoes">
                <button
                  className="btn-editar"
                  onClick={() => abrirModalEditar(item)}
                  title="Editar"
                >
                  <i className="fas fa-edit"></i>
                </button>
                <button
                  className="btn-excluir"
                  onClick={() => excluirDocumento(item.id)}
                  title="Excluir"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Modal de Criação / Edição */}
      {modalAberto && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>
              {modo === "criar" ? "Criar Novo Documento" : "Editar Documento"}
            </h3>
            <p>
              Insira os dados em formato JSON válido (ex:{" "}
              <code>{`{"nome": "Maria"}`}</code>).
            </p>
            <textarea
              value={jsonDado}
              onChange={(e) => setJsonDado(e.target.value)}
              rows="12"
              spellCheck="false"
            ></textarea>
            <div className="modal-acoes">
              <button
                className="btn-cancelar"
                onClick={() => setModalAberto(false)}
                disabled={loadingAcao}
              >
                Cancelar
              </button>
              <button
                className="btn-salvar"
                onClick={salvarDocumento}
                disabled={loadingAcao}
              >
                {loadingAcao ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  <i className="fas fa-save"></i>
                )}{" "}
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Componente principal da Página Admin ---
function Admin({ setPagina }) {
  const [usuario, setUsuario] = useState(null);
  const [verificando, setVerificando] = useState(true);
  const [colecaoAtual, setColecaoAtual] = useState("professores"); // Coleção que abre por padrão

  // As coleções principais do site para listar no menu
  const colecoesDisponiveis = [
    "professores",
    "laboratorios",
    "eventos",
    "noticias",
    "livros",
    "coordenacao",
    "sites",
    "socials",
  ];

  useEffect(() => {
    const cancelarListener = onAuthStateChanged(auth, (usuarioFirebase) => {
      if (usuarioFirebase) {
        setUsuario({
          nome: usuarioFirebase.displayName || "Administrador",
          email: usuarioFirebase.email,
        });
      } else {
        localStorage.removeItem("usuario");
        setPagina("login");
      }
      setVerificando(false);
    });
    return () => cancelarListener();
  }, [setPagina]);

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("usuario");
    setPagina("login");
  };

  if (verificando) return null;
  if (!usuario) return null;

  return (
    <div className="admin-page-full">
      {/* Menu Lateral */}
      <aside className="admin-sidebar">
        <div className="admin-perfil">
          <i className="fas fa-user-shield admin-icone"></i>
          <h3>Área Admin</h3>
          <p>{usuario.nome}</p>
          <span>{usuario.email}</span>
          <button className="admin-btn-sair-small" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i> Sair
          </button>
        </div>

        <nav className="admin-menu">
          <h4>Coleções do Banco</h4>
          <ul>
            {colecoesDisponiveis.map((col) => (
              <li
                key={col}
                className={colecaoAtual === col ? "ativo" : ""}
                onClick={() => setColecaoAtual(col)}
              >
                <i className="fas fa-database"></i> {col}
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Conteúdo Principal (Lista / CRUD) */}
      <main className="admin-main">
        {/* A prop key força o componente a remontar e buscar do banco sempre que mudar a coleção */}
        <PainelColecao key={colecaoAtual} nomeColecao={colecaoAtual} />
      </main>
    </div>
  );
}

export default Admin;
