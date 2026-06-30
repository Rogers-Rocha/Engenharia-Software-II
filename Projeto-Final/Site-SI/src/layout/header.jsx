import { useState } from "react";

import "./App.css";

import Logo from "./assets/logo-site-si.jpg";

// Os parâmetros representam os handlers de cada funcionalidade do Header
function Header({ goToHome, openMenu, fazerPesquisa }) {
  const [inputPesquisa, setInputPesquisa] = useState("");

  const handlePesquisa = () => {
    if (inputPesquisa.trim() === "") return; // Não faça nada se a pesquisa for vazia
    fazerPesquisa(inputPesquisa.trim());
    setInputPesquisa(""); // Limpa input da pesquisa
  };

  return (
    <header className="br-header">
      {/* container-lg adiciona um espaço em branco de cada lado do elemento */}
      <div className="container-lg">
        <div
          className="header-top" // Requerido pelo govbr-ds para rendernização correta do header
          style={{ display: "flex", alignItems: "center" }} // Mantém todos os itens do header alinhados
        >
          {/* Botão do Menu*/}
          <div className="header-menu-trigger" style={{ marginRight: "24px" }}>
            <button
              className="br-button circle small"
              type="button"
              onClick={openMenu}
            >
              <i className="fas fa-bars" style={{ fontSize: "24px" }} />
            </button>
          </div>

          {/* Logo e Título com interação para Home */}
          <div className="header-logo">
            <img
              src={Logo}
              alt="Logo"
              onClick={goToHome}
              style={{ cursor: "pointer" }}
            />
            <span className="br-divider vertical md"></span>
            <div
              className="header-title"
              onClick={goToHome}
              style={{
                cursor: "pointer",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              Site S.I.
            </div>
          </div>

          {/* Container das "ações" do header (localizado do lado direito) */}
          <div className="header-actions">
            {/* Input e Botão de pesquisa */}
            <div className="br-input">
              <input
                id="pesquisa"
                type="search"
                placeholder="Pesquisar..."
                value={inputPesquisa}
                onChange={(e) => setInputPesquisa(e.target.value)}
                // Aciona a pesquisa se pressionar Enter
                onKeyDown={(event) => {
                  if (event.key === "Enter") handlePesquisa();
                }}
              />
              <button
                className="br-button circle"
                type="button"
                onClick={handlePesquisa}
              >
                <i className="fas fa-search" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
