import { useEffect, useRef } from "react";

const isImagem = (k) => ["foto", "imagem"].some((x) => k.toLowerCase().includes(x));
const isIcon = (k) => k.toLowerCase().includes("icon");
const isColor = (k) => ["cor", "color"].some((x) => k.toLowerCase() === x);

const RenderInput = ({ id, tipo, val, onChange, useTextarea, onUpload }) => {
  if (isImagem(id)) {
    return (
      <div className="admin-form-file-container">
        {val && <img src={val} alt="preview" className="admin-img-preview" />}
        <label className="admin-file-label">
          <i className="fas fa-cloud-upload-alt admin-file-label-icon" />
          {val ? "Trocar Imagem" : "Selecionar Imagem"}
          <input id={id} type="file" accept="image/*" onChange={onUpload} style={{ display: "none" }} />
        </label>
      </div>
    );
  }

  if (isIcon(id)) {
    return (
      <div className="admin-icon-wrapper">
        <i className={`${val || "fas fa-question-circle"} admin-icon-preview`} />
        <input
          id={id}
          type="text"
          placeholder="Ex: fab fa-discord"
          value={val || ""}
          onChange={onChange}
          className="admin-form-input w-100"
        />
      </div>
    );
  }

  if (isColor(id)) {
    return <input id={id} type="color" value={val || "#000000"} onChange={onChange} className="admin-color-input" />;
  }

  if (tipo === "boolean") {
    return <input id={id} type="checkbox" checked={val || false} onChange={onChange} className="admin-form-checkbox" />;
  }

  if (tipo === "string" && useTextarea) {
    return <textarea id={id} required={!isImagem(id)} value={val || ""} onChange={onChange} className="admin-form-textarea w-100" />;
  }

  return (
    <input
      id={id}
      type={tipo === "number" ? "number" : tipo === "date" ? "date" : "text"}
      required={!isImagem(id)}
      value={val ?? ""}
      onChange={onChange}
      className="admin-form-input w-100"
    />
  );
};

const AdminModalArrayItem = ({ it, idx, lo, schema, formatLabel, handleArrChange, handleUpload, rmArrItem }) => (
  <div className="admin-form-array-item admin-form-array-item-wrapper">
    {(schema.layoutSub[lo.campo] || []).map((sub, sIdx) => {
      if (sub.type === "single") {
        return (
          <div className="br-input admin-form-group admin-sub-item-group" key={sIdx}>
            <label className="admin-form-label">{formatLabel(sub.campo)}</label>
            <RenderInput
              id={sub.campo}
              tipo={schema.sub[lo.campo][sub.campo]}
              val={it[sub.campo]}
              onChange={(e) => handleArrChange(lo.campo, idx, sub.campo, e.target.value, schema.sub[lo.campo][sub.campo])}
              onUpload={(e) => handleUpload(e, true, lo.campo, idx, sub.campo)}
              useTextarea={true}
            />
          </div>
        );
      }

      return (
        <div className="admin-form-paired-container admin-sub-item-group" key={sIdx}>
          <div className="main-paired-label">{formatLabel(sub.base)}</div>
          <div className="admin-form-paired-row">
            {["inicio", "fim"].map((k) => (
              <div className="br-input admin-form-group flex-1" key={k}>
                <label className="admin-form-label sub-label">{k === "inicio" ? "Início" : "Fim"}</label>
                <RenderInput
                  id={sub[k]}
                  tipo={schema.sub[lo.campo][sub[k]]}
                  val={it[sub[k]]}
                  onChange={(e) => handleArrChange(lo.campo, idx, sub[k], e.target.value, schema.sub[lo.campo][sub[k]])}
                />
              </div>
            ))}
          </div>
        </div>
      );
    })}

    <button
      type="button"
      onClick={() => rmArrItem(lo.campo, idx)}
      className="br-button danger admin-btn-remove-circle admin-btn-remove-abs"
    >
      <i className="fas fa-trash" />
    </button>
  </div>
);

const AdminModalArraySection = ({ lo, schema, formData, formatLabel, handleArrChange, handleUpload, rmArrItem, addArrItem }) => (
  <div className="admin-form-group admin-array-field-wrapper mb-20">
    <label className="admin-form-label admin-array-title">{formatLabel(lo.campo)}</label>
    <div className="admin-form-array-container">
      <div className="admin-form-array-list">
        {(formData[lo.campo] || []).map((it, idx) => (
          <AdminModalArrayItem
            key={idx}
            it={it}
            idx={idx}
            lo={lo}
            schema={schema}
            formatLabel={formatLabel}
            handleArrChange={handleArrChange}
            handleUpload={handleUpload}
            rmArrItem={rmArrItem}
          />
        ))}
      </div>
      <div className="admin-form-array-actions">
        <button type="button" onClick={() => addArrItem(lo.campo)} className="br-button secondary admin-btn-add-rect">
          <i className="fas fa-plus" /> Adicionar {formatLabel(lo.campo).replace(/s$/, "")}
        </button>
      </div>
    </div>
  </div>
);

export default function AdminModal({
  docEditando,
  schema,
  formData,
  carregando,
  salvarDoc,
  fecharModal,
  handleChange,
  handleArrChange,
  rmArrItem,
  addArrItem,
  formatLabel,
  handleUpload,
}) {
  const modalRef = useRef(null);

  useEffect(() => {
    const escutarCliqueExterno = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) fecharModal();
    };
    document.addEventListener("mousedown", escutarCliqueExterno);
    return () => document.removeEventListener("mousedown", escutarCliqueExterno);
  }, [fecharModal]);

  return (
    <div className="admin-modal-overlay">
      <div ref={modalRef} className="br-card admin-modal-content">
        <h3 className="admin-modal-title">{docEditando ? "Editar" : "Novo"}</h3>
        <form onSubmit={salvarDoc}>
          {schema.layout.map((lo, idx) => {
            if (lo.type === "single") {
              const t = schema.raiz[lo.campo];
              if (!t) return null;

              if (t === "array") {
                return (
                  <AdminModalArraySection
                    key={idx}
                    lo={lo}
                    schema={schema}
                    formData={formData}
                    formatLabel={formatLabel}
                    handleArrChange={handleArrChange}
                    handleUpload={handleUpload}
                    rmArrItem={rmArrItem}
                    addArrItem={addArrItem}
                  />
                );
              }

              return (
                <div className="br-input admin-form-group admin-sub-item-group" key={idx}>
                  <label className="admin-form-label">{formatLabel(lo.campo)}</label>
                  <RenderInput
                    id={lo.campo}
                    tipo={t}
                    val={formData[lo.campo]}
                    onChange={(e) => handleChange(e, lo.campo, t)}
                    useTextarea={true}
                    onUpload={(e) => handleUpload(e, false, lo.campo)}
                  />
                </div>
              );
            }

            return (
              <div className="admin-form-paired-container admin-sub-item-group" key={idx}>
                <div className="main-paired-label">{formatLabel(lo.base)}</div>
                <div className="admin-form-paired-row">
                  {["inicio", "fim"].map((k) => (
                    <div className="br-input admin-form-group flex-1" key={k}>
                      <label className="admin-form-label sub-label">{k === "inicio" ? "Início" : "Fim"}</label>
                      <RenderInput
                        id={lo[k]}
                        tipo={schema.raiz[lo[k]]}
                        val={formData[lo[k]]}
                        onChange={(e) => handleChange(e, lo[k], schema.raiz[lo[k]])}
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          <div className="admin-form-actions">
            <button type="submit" className="br-button primary flex-1" disabled={carregando}>
              {carregando ? "Carregando..." : "Salvar"}
            </button>
            <button type="button" className="br-button secondary flex-1" onClick={fecharModal} disabled={carregando}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
