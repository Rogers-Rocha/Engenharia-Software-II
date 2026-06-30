import FormularioProfessor from "../componentes/formularioProfessor.jsx";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase/firebase.js";
import { useColecao } from "../firebase/useColecao.js";
import { obterSchema } from "../firebase/schemasColecao.js";
import { textoParaListaObjetos } from "../componentes/conversoresTexto.js";
import CampoFormulario from "../componentes/CampoFormulario.jsx";

import "../App.css";
import "../css-classes/admin.css";

// --- Subcomponente: Formulário Dinâmico ---
// Responsabilidade: dado o schema de uma coleção, renderizar os campos NA
// ORDEM definida no schema, manter o estado do formulário e, no submit,
// converter os campos "lista-texto" de volta para array de objetos antes
// de entregar ao componente pai (que sabe falar com o Firestore).
function FormularioDinamico({ modo, schema, itemEditar, proximoId, aoSalvar, aoCancelar, loading }) {
  const [campos, setCampos] = useState({});

  useEffect(() => {
    if (modo === "editar" && itemEditar) {
      setCampos(itemEditar);
    } else {
      // Modo criar: monta um objeto vazio com todas as chaves do schema,
      // já com o próximo ID sugerido
      const estruturaBase = {};
      schema.campos.forEach((def) => {
        if (def.tipo === "id-numerico") {
          estruturaBase[def.chave] = proximoId;
        } else if (def.tipo === "lista-texto") {
          estruturaBase[def.chave] = []; // array vazio até o usuário digitar
        } else {
          estruturaBase[def.chave] = "";
        }
      });
      setCampos(estruturaBase);
    }
  }, [modo, itemEditar, proximoId, schema]);

  const handleMudarCampo = (chave, valor) => {
    setCampos((prev) => ({ ...prev, [chave]: valor }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Converte todos os campos "lista-texto" (que durante a digitação ficam
    // como texto cru) para array de objetos antes de enviar ao Firestore
    const camposConvertidos = { ...campos };
    schema.campos.forEach((def) => {
      if (def.tipo === "lista-texto") {
        const valorAtual = camposConvertidos[def.chave];
        if (typeof valorAtual === "string") {
          camposConvertidos[def.chave] = textoParaListaObjetos(valorAtual, def.subcampos);
        }
      }
    });

    aoSalvar(camposConvertidos);
  };

  return (
    <form onSubmit={handleSubmit} className="formulario-dinamico">
      {/* A ordem de renderização segue exatamente schema.campos, garantindo
          que cada coleção exiba seus campos na sequência desejada */}
      {schema.campos.map((definicaoCampo) => (
        <CampoFormulario
          key={definicaoCampo.chave}
          definicaoCampo={definicaoCampo}
          valor={campos[definicaoCampo.chave]}
          aoMudar={handleMudarCampo}
          proximoId={proximoId}
          modo={modo}
        />
      ))}

      <div className="modal-acoes">
        <button type="button" className="btn-cancelar" onClick={aoCancelar} disabled={loading}>
          Cancelar
        </button>
        <button type="submit" className="btn-salvar" disabled={loading}>
          {loading ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-save"></i>} Salvar
        </button>
      </div>
    </form>
  );
}

// --- Subcomponente que cuida do CRUD de uma coleção selecionada ---
function PainelColecao({ nomeColecao }) {
  const { dados, carregando, erro } = useColecao(nomeColecao);
  const [itens, setItens] = useState([]);

  useEffect(() => {
    if (dados) setItens(dados);
  }, [dados]);

  const [modalAberto, setModalAberto] = useState(false);
  const [modo, setModo] = useState("criar");
  const [itemAtual, setItemAtual] = useState(null);
  const [loadingAcao, setLoadingAcao] = useState(false);

  const schema = obterSchema(nomeColecao);

  // Calcula o próximo ID numérico sequencial
  const obterProximoIdNumerico = () => {
    const idsNumericos = itens.map((i) => Number(i.id)).filter((id) => !isNaN(id));
    return idsNumericos.length > 0 ? Math.max(...idsNumericos) + 1 : 1;
  };

  const abrirModalCriar = () => {
    setModo("criar");
    setItemAtual(null);
    setModalAberto(true);
  };

  const abrirModalEditar = (item) => {
    setModo("editar");
    setItemAtual(item);
    setModalAberto(true);
  };

  const salvarDocumento = async (dadosFormulario) => {
    setLoadingAcao(true);
    try {
      const { id, ...camposSemId } = dadosFormulario;

      if (modo === "criar") {
        if (id) {
          await setDoc(doc(collection(db, nomeColecao), id.toString()), camposSemId);
          setItens([...itens, { id: id.toString(), ...camposSemId }]);
        } else {
          const docRef = await addDoc(collection(db, nomeColecao), camposSemId);
          setItens([...itens, { id: docRef.id, ...camposSemId }]);
        }
        alert("Documento criado com sucesso!");
      } else {
        const docRef = doc(db, nomeColecao, itemAtual.id);
        await updateDoc(docRef, camposSemId);
        setItens(itens.map((i) => (i.id === itemAtual.id ? { id: itemAtual.id, ...camposSemId } : i)));
        alert("Documento atualizado com sucesso!");
      }
      setModalAberto(false);
    } catch (error) {
      alert("Erro ao salvar: " + error.message);
    } finally {
      setLoadingAcao(false);
    }
  };

  const excluirDocumento = async (id) => {
    if (!window.confirm("Tem certeza absoluta que deseja excluir este documento?")) return;
    try {
      await deleteDoc(doc(db, nomeColecao, id));
      setItens(itens.filter((i) => i.id !== id));
      alert("Documento excluído com sucesso!");
    } catch (error) {
      alert("Erro ao excluir documento: " + error.message);
    }
  };

  if (carregando) return <div className="admin-loading"><i className="fas fa-spinner fa-spin"></i> Carregando...</div>;
  if (erro) return <div className="admin-error"><i className="fas fa-exclamation-triangle"></i> Erro: {erro}</div>;

  // Se a coleção não tiver schema customizado (ex: "socials", que nem existe
  // no Firestore hoje), avisamos em vez de quebrar
  if (!schema) {
    return (
      <div className="admin-error">
        <i className="fas fa-exclamation-triangle"></i> A coleção <strong>{nomeColecao}</strong> ainda
        não possui um formulário configurado em <code>schemasColecao.js</code>.
      </div>
    );
  }

  return (
    <div className="colecao-container">
      <div className="colecao-header">
        <h3>Gerenciando: <span>{schema.rotuloSingular}</span></h3>
        <button className="btn-adicionar" onClick={abrirModalCriar}>
          <i className="fas fa-plus"></i> Novo Documento
        </button>
      </div>

      {itens.length === 0 ? (
        <p className="sem-dados">Nenhum documento encontrado em <strong>{nomeColecao}</strong>.</p>
      ) : (
        <ul className="lista-documentos">
          {itens.map((item) => (
            <li key={item.id} className="documento-item">
              <div className="documento-info">
                <strong>ID: {item.id}</strong>
                <pre className="documento-preview">{JSON.stringify(item, null, 2).slice(0, 120)}...</pre>
              </div>
              <div className="documento-acoes">
                <button className="btn-editar" onClick={() => abrirModalEditar(item)} title="Editar">
                  <i className="fas fa-edit"></i>
                </button>
                <button className="btn-excluir" onClick={() => excluirDocumento(item.id)} title="Excluir">
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {modalAberto && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{modo === "criar" ? "Criar Novo Documento" : "Editar Documento"}</h3>

            {/* Formulário dedicado para professores; genérico para as demais coleções */}
            {nomeColecao === "professores" ? (
              <FormularioProfessor
                modo={modo}
                itemEditar={itemAtual}
                proximoId={obterProximoIdNumerico()}
                aoSalvar={salvarDocumento}
                aoCancelar={() => setModalAberto(false)}
                loading={loadingAcao}
              />
            ) : (
              <FormularioDinamico
                modo={modo}
                itemPrimeiro={itens[0] || null}
                itemEditar={itemAtual}
                proximoId={obterProximoIdNumerico()}
                aoSalvar={salvarDocumento}
                aoCancelar={() => setModalAberto(false)}
                loading={loadingAcao}
              />
            )}
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
  const [colecaoAtual, setColecaoAtual] = useState("professores");

  const colecoesDisponiveis = [
    "professores",
    "laboratorios",
    "eventos",
    "noticias",
    "livros",
    "coordenacao",
    "sites",
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

      <main className="admin-main">
        <PainelColecao key={colecaoAtual} nomeColecao={colecaoAtual} />
      </main>
    </div>
  );
}

export default Admin;
