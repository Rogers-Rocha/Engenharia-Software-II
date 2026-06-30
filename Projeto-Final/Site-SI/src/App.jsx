import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";

import Header from "./header.jsx";
import Menu from "./menu.jsx";
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
import Login from "./paginas/login.jsx";
import Admin from "./paginas/admin.jsx";


import "./App.css";

function App() {
  const [menuIsOpen, setMenuOpen] = useState(false); // Controla o estado do Menu (aberto ou fechado)

  // "verificando" = true enquanto o Firebase ainda não respondeu
  // Evita renderizar qualquer página antes de saber se há sessão ativa
  const [verificando, setVerificando] = useState(true);

  // Agora pagina é sempre uma string
  const [pagina, setPagina] = useState(() => {
    return sessionStorage.getItem("paginaAtual") || "home";
  });

  // ── Verifica sessão do Firebase ao iniciar ──────────────────────────────
  useEffect(() => {
    const cancelarListener = onAuthStateChanged(auth, (usuarioFirebase) => {
      if (usuarioFirebase) {
        // Havia sessão ativa — salva no localStorage e vai para admin
        localStorage.setItem(
          "usuario",
          JSON.stringify({
            nome: usuarioFirebase.displayName || "Administrador",
            email: usuarioFirebase.email,
          }),
        );
        setPagina("admin");
      } else {
        // Sem sessão — limpa qualquer resquício do sistema antigo
        localStorage.removeItem("usuario");

        // Apaga o cookie antigo caso ainda exista
        document.cookie = "sessaoAdmin=; max-age=0; path=/; SameSite=Lax";
      }
      // Firebase respondeu — libera a renderização
      setVerificando(false);
    });

    return () => cancelarListener();
  }, []);

  useEffect(() => {
    // Evita salvar "login" ou "admin" se preferir que o F5 neles tenha comportamento diferente,
    // mas no geral, salvar a string direta resolve:
    sessionStorage.setItem("paginaAtual", pagina);
  }, [pagina]);

  const toggleMenu = () => {
    // Alterna o estado do Menu
    if (menuIsOpen) {
      // Fecha todo os folders abertos quando o menu for fechado
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

  const changePage = (nomePagina) => (e) => {
    e.preventDefault();
    setPagina(nomePagina);
    if (menuIsOpen) {
      toggleMenu();
    }
  };

  function defaultHandler(e) {
    e.preventDefault();
    toggleMenu();
  }

  atalhos.value = [
    // Array contendo os atalhos da página home
    {
      name: options.events.name,
      handler: changePage("eventos"),
      href: options.events.href,
      icon: "fa-calendar-alt",
    },
    {
      name: options.profs.name,
      handler: changePage("professores"),
      href: options.profs.href,
      icon: "fa-user",
    },
    {
      name: options.study.items.books.name,
      handler: changePage("livros"),
      href: options.study.items.books.href,
      icon: "fa-book",
    },
    {
      name: options.study.items.sites.name,
      handler: changePage("sites"),
      href: options.study.items.sites.href,
      icon: "fa-link",
    },
  ];

  // Associa handlers específicos com a chave equivalente da página (ex: defaultHandler.home = ...)
  // Caso o handler não seja fornecido, usa o defaultHandler (fallback)
  defaultHandler.home = changePage("home");
  defaultHandler.socials = changePage("socials");
  defaultHandler.profs = changePage("professores");
  defaultHandler.coord = changePage("coordenacao");
  defaultHandler.labs = changePage("laboratorios");
  defaultHandler.books = changePage("livros");
  defaultHandler.sites = changePage("sites");
  defaultHandler.events = changePage("eventos");
  defaultHandler.news = changePage("noticias");

  // ── Handler do login agora consulta só o Firebase
  // Ao clicar em "Área Administrativa", verifica se já está logado
  defaultHandler.login = (e) => {
    e.preventDefault();
    const usuarioAtual = auth.currentUser;
    setPagina(usuarioAtual ? "admin" : "login");
    toggleMenu();
  };

  // Adiciona os handler ao objeto que representa as opções do Menu
  addHandlers(options, defaultHandler);

  // Mock da pesquisa no site
  const tempPesquisa = (inputPesquisa) =>
    alert(`Pesquisando ${inputPesquisa}...`);

  // ── Renderização das páginas por nome (string)
  const renderPagina = () => {
    switch (pagina) {
      case "home":
        return home;
      case "socials":
        return <Socials />;
      case "professores":
        return <Professores />;
      case "coordenacao":
        return <Coordenacao />;
      case "laboratorios":
        return <Laboratorios />;
      case "livros":
        return <Livros />;
      case "sites":
        return <Sites />;
      case "eventos":
        return <Eventos />;
      case "noticias":
        return <Noticias />;
      case "login":
        return <Login setPagina={setPagina} />;
      case "admin":
        return <Admin setPagina={setPagina} />;
      default:
        return home;
    }
  };

  // ── Enquanto o Firebase verifica a sessão, não renderiza nada ────────────
  // Evita o "flash" de página errada antes da verificação terminar
  if (verificando) return null;

  return (
    <>
      <Header
        goToHome={() => setPagina("home")}
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
      <main className="container-lg">{renderPagina()}</main>
    </>
  );
}

export default App;
