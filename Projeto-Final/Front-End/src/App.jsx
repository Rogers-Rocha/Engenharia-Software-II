import "./App.css";
import { BrHeader, BrButton, BrIcon } from "@govbr-ds/webcomponents-react";

function App() {
  return (
    <header className="br-header">
      <div className="container-lg">
        <div className="header-top">
          <div className="header-logo">
            <img
              src="https://www.gov.br/ds/assets/img/govbr-logo-large.png"
              alt="Logo"
            />
            <span className="br-divider vertical mx-1"></span>
            <div className="header-sign">Órgão Responsável</div>
          </div>
          <div className="header-actions">
            <BrButton primary onBrClick={() => console.log("Login")}>
              <BrIcon icon="user" />
              <span className="ml-1">Entrar</span>
            </BrButton>
          </div>
        </div>
      </div>
    </header>
  );
}

export default App;
