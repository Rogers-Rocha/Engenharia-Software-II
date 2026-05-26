import "./App.css";

function Menu({ isOpen, toggleMenu, options = [] }) {
  return (
    <div
      className={`br-menu push ${isOpen ? "active" : ""}`}
      id="main-navigation"
    >
      <div className="menu-container">
        <div className="menu-panel">
          <div className="menu-header">
            <div className="menu-title">Menu Principal</div>
            <button
              className="br-button circle menu-close"
              type="button"
              onClick={toggleMenu}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>

          <nav className="menu-body" role="navigation">
            <div className="menu-folder">
              <a className="menu-item" href="#item1" onClick={toggleMenu}>
                <span className="icon">
                  <i className="fas fa-home" aria-hidden="true"></i>
                </span>
                <span className="content">Início</span>
              </a>

              <span className="br-divider"></span>

              <a className="menu-item" href="#item2" onClick={toggleMenu}>
                <span className="icon">
                  <i className="fas fa-user" aria-hidden="true"></i>
                </span>
                <span className="content">Meu Perfil</span>
              </a>

              <span className="br-divider"></span>

              <a className="menu-item" href="#item3" onClick={toggleMenu}>
                <span className="icon">
                  <i className="fas fa-cog" aria-hidden="true"></i>
                </span>
                <span className="content">Configurações</span>
              </a>
            </div>
          </nav>
        </div>

        {/* 'menu-scrim' é a película escura padrão do GovBR-DS que fica atrás do menu */}
        <div
          className="menu-scrim"
          data-dismiss="menu"
          tabIndex="0"
          onClick={toggleMenu}
        ></div>
      </div>
    </div>
  );
}

export default Menu;
