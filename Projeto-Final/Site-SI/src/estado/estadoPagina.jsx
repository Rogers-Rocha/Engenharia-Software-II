// src/componentes/estadoPagina.jsx

export function Carregando({ mensagem = "Carregando dados..." }) {
  return (
    <div style={{ textAlign: "center", padding: "3rem", color: "#555" }}>
      <i className="fas fa-spinner fa-spin fa-2x"></i>
      <p style={{ marginTop: "1rem" }}>{mensagem}</p>
    </div>
  );
}

export function ErroCarregamento({ mensagem = "Erro ao carregar dados." }) {
  return (
    <div style={{ textAlign: "center", padding: "3rem", color: "#c0392b" }}>
      <i className="fas fa-exclamation-triangle fa-2x"></i>
      <p style={{ marginTop: "1rem" }}>{mensagem}</p>
    </div>
  );
}