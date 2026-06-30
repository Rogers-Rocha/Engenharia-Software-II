const isImagem = (k) => ["foto", "imagem"].some((x) => k.toLowerCase().includes(x));
const isIcon = (k) => k.toLowerCase().includes("icon");
const isColor = (k) => ["cor", "color"].some((x) => k.toLowerCase() === x);

const AdminCardSubElement = ({ s, it, schema, k, formatLabel, formatDate }) => {
  if (s.type === "single") {
    if (it[s.campo] === undefined) return null;
    return (
      <div className="admin-card-array-subfield">
        <strong>{formatLabel(s.campo)}: </strong>
        {isImagem(s.campo) ? (
          <img src={it[s.campo]} alt="preview" className="admin-card-img-preview" />
        ) : isIcon(s.campo) ? (
          <i className={`${it[s.campo]} admin-card-icon-small`} />
        ) : isColor(s.campo) ? (
          <span className="admin-card-color-box-small" style={{ backgroundColor: it[s.campo] }}></span>
        ) : schema.sub[k][s.campo] === "date" ? (
          formatDate(it[s.campo])
        ) : (
          String(it[s.campo])
        )}
      </div>
    );
  }

  if (it[s.inicio] === undefined && it[s.fim] === undefined) return null;
  return (
    <div className="admin-card-array-subfield">
      <strong>{formatLabel(s.base)}: </strong>
      <span className="admin-card-value-paired">
        <span className="paired-badge-label">Início:</span>{" "}
        {schema.sub[k][s.inicio] === "date" ? formatDate(it[s.inicio]) : String(it[s.inicio])}
        <span className="paired-badge-separator">|</span>
        <span className="paired-badge-label">Fim:</span> {schema.sub[k][s.fim] === "date" ? formatDate(it[s.fim]) : String(it[s.fim])}
      </span>
    </div>
  );
};

const AdminCardArrayField = ({ v, k, schema, formatLabel, formatDate }) => (
  <div className="admin-card-array-container">
    {v.map((it, idx) => (
      <div key={idx} className="admin-card-array-item">
        {(schema.layoutSub[k] || []).map((s, sIdx) => (
          <AdminCardSubElement key={sIdx} s={s} it={it} schema={schema} k={k} formatLabel={formatLabel} formatDate={formatDate} />
        ))}
      </div>
    ))}
  </div>
);

export default function AdminCard({ docItem, schema, onEdit, onDelete, formatLabel, formatDate }) {
  const renderValCard = (k, v) => {
    if (!v && typeof v !== "boolean" && typeof v !== "number") return "";
    if (isImagem(k)) return <img src={v} alt="preview" className="admin-card-img-preview" />;
    if (isIcon(k)) return <i className={`${v} admin-card-icon-preview`} />;
    if (isColor(k)) return <div className="admin-card-color-box" style={{ backgroundColor: v }} title={v}></div>;
    if (schema.raiz[k] === "date" || schema.sub[k] === "date") return formatDate(v);
    if (typeof v === "boolean") return v ? "Sim" : "Não";
    if (Array.isArray(v)) return <AdminCardArrayField v={v} k={k} schema={schema} formatLabel={formatLabel} formatDate={formatDate} />;
    return String(v);
  };

  return (
    <div className="br-card admin-card-custom">
      <div className="admin-card-content">
        {schema.layout.map((lo, idx) => {
          if (lo.type === "single") {
            if (docItem[lo.campo] === undefined) return null;
            return (
              <div key={idx} className="admin-card-field">
                <strong>{formatLabel(lo.campo)}: </strong>
                <div className={`admin-card-value ${Array.isArray(docItem[lo.campo]) ? "is-array" : ""}`}>
                  {renderValCard(lo.campo, docItem[lo.campo])}
                </div>
              </div>
            );
          }

          if (docItem[lo.inicio] === undefined && docItem[lo.fim] === undefined) return null;
          return (
            <div key={idx} className="admin-card-field">
              <strong>{formatLabel(lo.base)}: </strong>
              <div className="admin-card-value-paired">
                <span className="paired-badge-label">Início:</span> {renderValCard(lo.inicio, docItem[lo.inicio])}
                <span className="paired-badge-separator">|</span>
                <span className="paired-badge-label">Fim:</span> {renderValCard(lo.fim, docItem[lo.fim])}
              </div>
            </div>
          );
        })}
      </div>
      <div className="admin-card-actions">
        <button className="br-button secondary small flex-1" onClick={() => onEdit(docItem)}>
          <i className="fas fa-edit admin-btn-icon" /> Editar
        </button>
        <button className="br-button danger small flex-1" onClick={() => onDelete(docItem.id)}>
          <i className="fas fa-trash admin-btn-icon" /> Excluir
        </button>
      </div>
    </div>
  );
}
