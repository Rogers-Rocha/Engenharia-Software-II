import { useState } from "react";

import Header from "./header.jsx";
import Menu from "./menu.jsx";
import { addHandlers, objToOpt } from "./options.jsx";
import options from "./assets/options.json";

import Home from "./home.jsx";
import Socials from "./socials.jsx";
import Professores from "./professores.jsx";
import Coordenacao from "./coordenacao.jsx";
import Livros from "./livros.jsx";
import Sites from "./sites.jsx";

import "./App.css";

function App() {
  const [menuIsOpen, setMenuOpen] = useState(false);
  const [pagina, setPagina] = useState(<Home />);

  const toggleMenu = () => {
    // Fecha os folders abertos do menu quando o menu for fechado
    if (menuIsOpen) {
      const pastasAbertas = document.querySelectorAll(".menu-folder.active");
      pastasAbertas.forEach((pasta) => {
        pasta.classList.remove("active");

        const subMenu = pasta.querySelector("ul");
        if (subMenu) subMenu.style.display = "none";

        const icone = pasta.querySelector(".support i");
        if (icone) icone.className = "fas fa-angle-down";
      });
    }
    setMenuOpen(!menuIsOpen);
  };

  // Factory que retorna um handler que troca a página e fecha o menu
  const changePage = (component) => (e) => {
    e.preventDefault();
    setPagina(component);
    toggleMenu();
  };

  // Handler padrão — apenas fecha o menu sem mudar de página
  function defaultHandler(e) {
    e.preventDefault();
    toggleMenu();
  }

  // Associa handlers específicos como propriedades da função padrão
  // addHandlers faz: options[key].handler = handler[key] ?? handler
  // Para chaves com handler específico (ex: home, socials) usa o específico
  // Para as demais, usa o defaultHandler (a própria função)
  defaultHandler.home = changePage(<Home />);
  defaultHandler.socials = changePage(<Socials />);
  defaultHandler.profs = changePage(<Professores />);
  defaultHandler.coord = changePage(<Coordenacao />);
  defaultHandler.books = changePage(<Livros />);
  defaultHandler.sites = changePage(<Sites />);

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
