import { useEffect } from "react";

import "../App.css";
import "../css-classes/admin.css";

// Verifica se o cookie de sessão existe
const temCookieSessao = () =>
  document.cookie
    .split("; ")
    .some((row) => row.startsWith("sessaoAdmin=true"));

function Admin({ setPagina }) {
  // Obtém os dados do usuário do localStorage
  const usuarioStr = localStorage.getItem("usuario");
  const usuario = usuarioStr ? JSON.parse(usuarioStr) : null;

  const sessaoValida = usuario && temCookieSessao();

  // Se não houver sessão válida, limpa e redireciona para o login
  useEffect(() => {
    if (!sessaoValida) {
      localStorage.removeItem("usuario");
      setPagina("login");
    }
  }, [sessaoValida, setPagina]);

  // Enquanto redireciona, não renderiza nada
  if (!sessaoValida) return null;

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    // Apaga o cookie de sessão
    document.cookie =
      "sessaoAdmin=; max-age=0; path=/; SameSite=Lax";
    setPagina("login");
  };

  return (
    <div className="admin-page">
      <div className="admin-card">
        <div className="admin-header">
          <i className="fas fa-user-shield admin-icone"></i>
          <h2>Área Administrativa</h2>
        </div>

        <div className="admin-info-item">
            <span className="admin-info-label">Nome</span>
            <span className="admin-info-value">{usuario.nome}</span>
          </div>

          <div className="admin-info-item">
            <span className="admin-info-label">E-mail</span>
            <span className="admin-info-value">{usuario.email}</span>
          </div>
          <button className="admin-btn-sair" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i>
            Sair
          </button>
        </div>
      </div>
  );
}

export default Admin;