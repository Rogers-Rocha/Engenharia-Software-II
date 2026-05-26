import "./App.css";

function Menu({ isOpen, toggleMenu, options }) {
  return (
    <div className={`br-menu ${isOpen ? "active" : ""}`} id="main-navigation">
      <div className="menu-container">
        <div
          className="menu-panel"
          style={{ maxWidth: "480px" }} /* Limita tamanho do menu */
        >
          {/* Cabeçalho do Menu */}
          <div className="menu-header">
            <div className="menu-title" style={{ fontWeight: "bold" }}>
              Menu Principal
            </div>
            <button
              className="br-button circle"
              type="button"
              onClick={toggleMenu}
            >
              <i className="fas fa-times" />
            </button>
          </div>

          {/* Corpo/Navegação do Menu */}
          <nav className="menu-body">{options}</nav>
        </div>

        {/* Scrim (fundo escurecido) que fecha o menu ao clicar fora*/}
        <div className="menu-scrim" onClick={toggleMenu}></div>
      </div>
    </div>
  );
}

export default Menu;
