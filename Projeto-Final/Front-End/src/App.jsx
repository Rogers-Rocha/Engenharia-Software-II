import { useState } from "react";

// Módulo do Header
//  - componente que fica na parte superior do site
import Header from "./header.jsx";
// Módulo do Menu principal
//  - fica oculto até que o botão do menu que está no Header seja acionado
import Menu from "./menu.jsx";
// Módulo auxiliar do Menu para controlar o comportamento das opções do menu
import { addHandlers, objToOpt } from "./options.jsx";
// Carrega o objeto que representa as opções do Menu principal
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
import Login from "./paginas/login.jsx";
import Admin from "./paginas/admin.jsx";
import CookieBanner from "./componentes/cookieBanner.jsx";

// Import das classes css globais
import "./App.css";

function App() {
  const [menuIsOpen, setMenuOpen] = useState(false); // Controla o estado do Menu (aberto ou fechado)

  // Alterna o estado do Menu
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

  const atalhos = { value: [] };
  const home = <Home atalhosRef={atalhos} />; // Inicializa a home com uma referência aos atalhos (atalhos.value = [...])
  const [pagina, setPagina] = useState(home); // Controla qual o conteúdo da página (Inicia na Home)

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

  // Array contendo os atalhos da página home
  atalhos.value = [
    {
      name: options.events.name,
      handler: (e) => {
        e.preventDefault();
        setPagina(<Eventos />);
      },
      href: options.events.href,
      icon: "fa-calendar-alt",
    },
    {
      name: options.profs.name,
      handler: (e) => {
        e.preventDefault();
        setPagina(<Professores />);
      },
      href: options.profs.href,
      icon: "fa-user",
    },
    {
      name: options.study.items.books.name,
      handler: (e) => {
        e.preventDefault();
        setPagina(<Livros />);
      },
      href: options.study.items.books.href,
      icon: "fa-book",
    },
    {
      name: options.study.items.sites.name,
      handler: (e) => {
        e.preventDefault();
        setPagina(<Sites />);
      },
      href: options.study.items.sites.href,
      icon: "fa-link",
    },
  ];

  // Associa handlers específicos com a chave equivalente da página (ex: defaultHandler.home = ...)
  // Caso o handler não seja fornecido, usa o defaultHandler (fallback)
  defaultHandler.home = changePage(home);
  defaultHandler.socials = changePage(<Socials />);
  defaultHandler.profs = changePage(<Professores />);
  defaultHandler.coord = changePage(<Coordenacao />);
  defaultHandler.labs = changePage(<Laboratorios />);
  defaultHandler.books = changePage(<Livros />);
  defaultHandler.sites = changePage(<Sites />);
  defaultHandler.events = changePage(<Eventos />);
  defaultHandler.news = changePage(<Noticias />);
  // Ao clicar em "Área Administrativa", verifica se já está logado
  defaultHandler.login = (e) => {
    e.preventDefault();
    const usuario = localStorage.getItem("usuario");
    const temCookie = document.cookie
      .split("; ")
      .some((row) => row.startsWith("sessaoAdmin=true"));
    const sessaoValida = usuario && temCookie;

    setPagina(sessaoValida ? "admin" : "login");
    toggleMenu();
  };

  // Adiciona os handler ao objeto que representa as opções do Menu
  addHandlers(options, defaultHandler);

  // Mock da pesquisa no site
  const tempPesquisa = (inputPesquisa) =>
    alert(`Pesquisando ${inputPesquisa}...`);

  return (
    <>
      <Header
        goToHome={() => setPagina(home)}
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

      <main className="container-lg">
        {pagina === "login" ? (
          <Login setPagina={setPagina} />
        ) : pagina === "admin" ? (
          <Admin setPagina={setPagina} />
        ) : pagina === "home" ? (
          home
        ) : (
          pagina
        )}
      </main>

      <CookieBanner />
    </>
  );
}

export default App;
