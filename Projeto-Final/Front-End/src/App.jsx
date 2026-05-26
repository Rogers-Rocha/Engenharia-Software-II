import { useState } from "react";
import Header from "./Header.jsx";
import Menu from "./Menu.jsx";
import Home from "./Home.jsx";
import options from "./options.json";
import { addHandlers, objToOpt } from "./options.jsx";
import "./App.css";

function App() {
  const [menuIsOpen, setMenuOpen] = useState(false);
  const [pagina, setPagina] = useState(Home());

  const toggleMenu = () => setMenuOpen(!menuIsOpen);

  // TEMPORARIO
  // IMPLEMENTAR MUDANÇA DA PÁGINA DE ACORDO COM A OPÇÃO
  const tempHandler = (e) => {
    e.preventDefault();
    toggleMenu();
  };

  addHandlers(options, tempHandler);

  const tempPesquisa = (inputPesquisa) =>
    alert(`Pesquisando ${inputPesquisa}...`);

  return (
    <>
      <Header
        goToHome={() => setPagina(Home())}
        openMenu={toggleMenu}
        fazerPesquisa={tempPesquisa}
      />

      <Menu
        isOpen={menuIsOpen}
        toggleMenu={toggleMenu}
        options={
          <nav className="menu-body" style={{ fontWeight: "bold" }}>
            {Object.values(options).map(objToOpt)}
          </nav>
        }
      />

      <main className="container-lg">{pagina}</main>
    </>
  );
}

export default App;
