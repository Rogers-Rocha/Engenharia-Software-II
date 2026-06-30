// src/componentes/formularioProfessor.jsx
import { useEffect, useState } from "react";

// Disciplina e Projeto vazios usados para inicializar novos itens nas listas
const DISCIPLINA_VAZIA = { nome: "", periodo: "" };
const PROJETO_VAZIO    = { nome: "", descricao: "" };

function FormularioProfessor({ modo, itemEditar, proximoId, aoSalvar, aoCancelar, loading }) {

  const [id,          setId]          = useState("");
  const [prof,        setProf]        = useState("");
  const [sala,        setSala]        = useState("");
  const [disciplinas, setDisciplinas] = useState([{ ...DISCIPLINA_VAZIA }]);
  const [projetos,    setProjetos]    = useState([{ ...PROJETO_VAZIO }]);

  // Preenche o formulário ao abrir no modo editar
  useEffect(() => {
    if (modo === "editar" && itemEditar) {
      setId(itemEditar.id ?? "");
      setProf(itemEditar.prof ?? "");
      setSala(itemEditar.sala ?? "");
      setDisciplinas(
        itemEditar.disciplinas?.length > 0
          ? itemEditar.disciplinas
          : [{ ...DISCIPLINA_VAZIA }]
      );
      setProjetos(
        itemEditar.projetos?.length > 0
          ? itemEditar.projetos
          : [{ ...PROJETO_VAZIO }]
      );
    } else {
      // Modo criar: só o ID vem preenchido como sugestão
      setId(String(proximoId));
      setProf("");
      setSala("");
      setDisciplinas([{ ...DISCIPLINA_VAZIA }]);
      setProjetos([{ ...PROJETO_VAZIO }]);
    }
  }, [modo, itemEditar, proximoId]);

  // ── Handlers de disciplinas ──────────────────────────────────────────────
  const atualizarDisciplina = (index, campo, valor) => {
    const nova = disciplinas.map((d, i) =>
      i === index ? { ...d, [campo]: valor } : d
    );
    setDisciplinas(nova);
  };

  const adicionarDisciplina = () =>
    setDisciplinas([...disciplinas, { ...DISCIPLINA_VAZIA }]);

  const removerDisciplina = (index) =>
    setDisciplinas(disciplinas.filter((_, i) => i !== index));

  // ── Handlers de projetos ─────────────────────────────────────────────────
  const atualizarProjeto = (index, campo, valor) => {
    const novo = projetos.map((p, i) =>
      i === index ? { ...p, [campo]: valor } : p
    );
    setProjetos(novo);
  };

  const adicionarProjeto = () =>
    setProjetos([...projetos, { ...PROJETO_VAZIO }]);

  const removerProjeto = (index) =>
    setProjetos(projetos.filter((_, i) => i !== index));

  // ── Submit ───────────────────────────────────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault();
    aoSalvar({ id, prof, sala, disciplinas, projetos });
  };

  return (
    <form onSubmit={handleSubmit} className="formulario-dinamico">

      {/* ── ID (autocomplete, bloqueado na edição) ── */}
      <div className="form-group">
        <label>ID <span className="label-obs"></span></label>
        <input className="no-board"
          type="text"
          value={id}
          readOnly
        />
      </div>

      {/* ── Professor(a) ── */}
      <div className="form-group">
        <label>Professor(a)</label>
        <input
          type="text"
          value={prof}
          onChange={(e) => setProf(e.target.value)}
          placeholder="Ex: Maria Silva de Oliveira"
          disabled={loading}
          required
        />
      </div>

      {/* ── Sala ── */}
      <div className="form-group">
        <label>Sala</label>
        <input
          type="text"
          value={sala}
          onChange={(e) => setSala(e.target.value)}
          placeholder="Ex: Sala dos Professores 02"
          disabled={loading}
          required
        />
      </div>

      {/* ── Disciplinas ── */}
      <div className="form-group">
        <label>Disciplinas</label>

        {disciplinas.map((disc, index) => (
          <div key={index} className="form-sub-item">
            <input
              type="text"
              value={disc.nome}
              onChange={(e) => atualizarDisciplina(index, "nome", e.target.value)}
              placeholder="Ex: Banco de Dados I"
              disabled={loading}
            />
            <input
              type="text"
              value={disc.periodo}
              onChange={(e) => atualizarDisciplina(index, "periodo", e.target.value)}
              placeholder="Período — Ex: 3º Período"
              disabled={loading}
            />
            {disciplinas.length > 1 && (
              <button
                type="button"
                className="btn-remover-sub"
                onClick={() => removerDisciplina(index)}
                disabled={loading}
                title="Remover disciplina"
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          className="btn-adicionar-sub"
          onClick={adicionarDisciplina}
          disabled={loading}
        >
          <i className="fas fa-plus"></i> Adicionar disciplina
        </button>
      </div>

      {/* ── Projetos de Pesquisa ── */}
      <div className="form-group">
        <label>Projetos de Pesquisa</label>

        {projetos.map((proj, index) => (
          <div key={index} className="form-sub-item form-sub-item--coluna">
            <input
              type="text"
              value={proj.nome}
              onChange={(e) => atualizarProjeto(index, "nome", e.target.value)}
              placeholder="Ex: IA aplicada à educação"
              disabled={loading}
            />
            <textarea
              value={proj.descricao}
              onChange={(e) => atualizarProjeto(index, "descricao", e.target.value)}
              placeholder="Descrição do projeto — Ex: Estudo sobre uso de inteligência artificial no apoio ao ensino superior..."
              rows={3}
              disabled={loading}
            />
            {projetos.length > 1 && (
              <button
                type="button"
                className="btn-remover-sub"
                onClick={() => removerProjeto(index)}
                disabled={loading}
                title="Remover projeto"
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          className="btn-adicionar-sub"
          onClick={adicionarProjeto}
          disabled={loading}
        >
          <i className="fas fa-plus"></i> Adicionar projeto
        </button>
      </div>

      {/* ── Ações ── */}
      <div className="modal-acoes">
        <button
          type="button"
          className="btn-cancelar"
          onClick={aoCancelar}
          disabled={loading}
        >
          Cancelar
        </button>
        <button type="submit" className="btn-salvar" disabled={loading}>
          {loading
            ? <i className="fas fa-spinner fa-spin"></i>
            : <i className="fas fa-save"></i>
          } Salvar
        </button>
      </div>
    </form>
  );
}

export default FormularioProfessor;