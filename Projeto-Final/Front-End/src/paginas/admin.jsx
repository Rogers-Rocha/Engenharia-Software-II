// src/paginas/admin.jsx
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

import "../App.css";
import "../css-classes/admin.css";

function Admin({ setPagina }) {
  const [usuario, setUsuario] = useState(null);
  const [verificando, setVerificando] = useState(true);

  useEffect(() => {
    // onAuthStateChanged é um listener do Firebase:
    // dispara imediatamente com o usuário atual (ou null se não logado)
    // e continua ouvindo mudanças de sessão
    const cancelarListener = onAuthStateChanged(auth, (usuarioFirebase) => {
      if (usuarioFirebase) {
        setUsuario({
          nome:  usuarioFirebase.displayName || "Administrador",
          email: usuarioFirebase.email,
        });
      } else {
        // Sem sessão ativa → redireciona para login
        localStorage.removeItem("usuario");
        setPagina("login");
      }
      setVerificando(false);
    });

    // Cancela o listener quando o componente desmonta
    return () => cancelarListener();
  }, [setPagina]);

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("usuario");
    setPagina("login");
  };

  // Enquanto o Firebase verifica a sessão, não renderiza nada
  if (verificando) return null;
  if (!usuario)    return null;

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