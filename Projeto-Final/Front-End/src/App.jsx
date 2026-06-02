import { useState } from "react";

// Módulo do Header
//  - componente que fica na parte superior do site
import Header from "./header.jsx";
// Módulo do Menu principal
//  - fica oculto até que o botão do menu que está no Header seja acionado
import Menu from "./menu.jsx";
// Módulo auxiliar do Menu para controlar o comportamento das opções do menu
import { addHandlers, objToOpt } from "./options.jsx";
import options from "./assets/options.json";

// Módulos de cada página do site
import Home from "./paginas/home.jsx";
import Socials from "./paginas/socials.jsx";
import Professores from "./paginas/professores.jsx";
import Coordenacao from "./paginas/coordenacao.jsx";
import Laboratorios from "./paginas/laboratorios.jsx";
import Livros from "./paginas/livros.jsx";
import Sites from "./paginas/sites.jsx";
import Eventos from "./paginas/eventos.jsx";
import Noticias from "./paginas/noticias.jsx";

// Import das classes css globais
import "./App.css";

function App() {
  const [menuIsOpen, setMenuOpen] = useState(false); // Controla o estado do Menu (aberto ou fechado)
  const [pagina, setPagina] = useState(<Home />); // Controla qual o conteúdo da página

  const toggleMenu = () => {
    // Fecha todo os folders abertos quando o menu for fechado
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

  // Fallback para troca de página = somente fecha o menu
  function defaultHandler(e) {
    e.preventDefault();
    toggleMenu();
  }

  // Associa handlers específicos com a chave equivalente da página (ex: defaultHandler.home = ...)
  // Caso o handler não seja fornecido, usa o defaultHandler (fallback)
  defaultHandler.home = changePage(<Home />);
  defaultHandler.socials = changePage(<Socials />);
  defaultHandler.profs = changePage(<Professores />);
  defaultHandler.coord = changePage(<Coordenacao />);
  defaultHandler.labs = changePage(<Laboratorios />);
  defaultHandler.books = changePage(<Livros />);
  defaultHandler.sites = changePage(<Sites />);
  defaultHandler.events = changePage(<Eventos />);
  defaultHandler.news = changePage(<Noticias />);

  // Adiciona os handler ao objeto que representa as opções do Menu
  addHandlers(options, defaultHandler);

  // Mock da pesquisa no site
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
