import { useState } from "react";
import Header from "./Header.jsx";
import Menu from "./Menu.jsx";
import Home from "./Home.jsx";
import Socials from "./Socials.jsx";
import options from "./options.json";
import { addHandlers, objToOpt } from "./options.jsx";
import "./App.css";

function App() {
  const [menuIsOpen, setMenuOpen] = useState(false);
  const [pagina, setPagina] = useState(<Home />);

  const toggleMenu = () => setMenuOpen(!menuIsOpen);

  // Factory que retorna um handler que troca a página e fecha o menu
  const changePage = (component) => (e) => {
    e.preventDefault();
    setPagina(component);
    setMenuOpen(false);
  };

  // Handler padrão — apenas fecha o menu sem mudar de página
  function defaultHandler(e) {
    e.preventDefault();
    setMenuOpen(false);
  }

  // Associa handlers específicos como propriedades da função padrão
  // addHandlers faz: options[key].handler = handler[key] ?? handler
  // Para chaves com handler específico (ex: home, socials) usa o específico
  // Para as demais, usa o defaultHandler (a própria função)
  defaultHandler.home = changePage(<Home />);
  defaultHandler.socials = changePage(<Socials />);

  addHandlers(options, defaultHandler);

  const tempPesquisa = (inputPesquisa) =>
    alert(`Pesquisando ${inputPesquisa}...`);

  return (
    <>
      <Header
        goToHome={() => setPagina(<Home />)}
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
