import { useState } from "react";
import Header from "./Header.jsx";
import Menu from "./Menu.jsx";
import Home from "./Home.jsx";
import options from "./options.json";
import "./App.css";

function App() {
  const [menuIsOpen, setMenuOpen] = useState(false);
  const [pagina, setPagina] = useState(Home());

  const toggleMenu = () => setMenuOpen(!menuIsOpen);

  // Função para abrir/fechar folders do menu principal
  const handleToggleFolder = (e) => {
    e.preventDefault();

    const currentFolder = e.currentTarget.closest(".menu-folder");
    const subMenu = currentFolder.querySelector("ul");
    const icon = currentFolder.querySelector(".support i");

    currentFolder.classList.toggle("active");

    if (currentFolder.classList.contains("active")) {
      subMenu.style.display = "block";
      icon.className = "fas fa-angle-up";
    } else {
      subMenu.style.display = "none";
      icon.className = "fas fa-angle-down";
    }
  };

  // TEMPORARIO
  // IMPLEMENTAR MUDANÇA DA PÁGINA DE ACORDO COM A OPÇÃO
  const tempHandler = (e) => {
    e.preventDefault();
    toggleMenu();
  };

  // Adiciona o handler para cada um dos objetos
  for (const [key, value] of Object.entries(options)) {
    if (value.type == "item") {
      options[key].handler = tempHandler;
    } else if (value.type == "folder") {
      value.handler = handleToggleFolder;
      for (const innerKey of Object.keys(value.items)) {
        options[key].items[innerKey].handler = tempHandler;
      }
    }
  }

  const expandFolder = (folder) => (
    <ul style={{ display: "none" }}>
      {Object.values(folder.items).map((option) => (
        <li>
          <a className="menu-item" href={option.href} onClick={option.handler}>
            <span className="content">{option.name}</span>
          </a>
        </li>
      ))}
    </ul>
  );

  // Converte um objeto em uma opção para o menu principal
  const objToOpt = (option) => {
    return (
      <div className="menu-folder">
        <a className="menu-item" href={option.href} onClick={option.handler}>
          <span className="content">{option.name}</span>
          {option.type === "folder" ? (
            <span className="support">
              <i className="fas fa-angle-down"></i>
            </span>
          ) : (
            <></>
          )}
        </a>
        {option.type === "folder" ? expandFolder(option) : <></>}
      </div>
    );
  };

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
          <nav className="menu-body">
            {Object.values(options).map(objToOpt)}
          </nav>
        }
      />

      <main className="container-lg">{pagina}</main>
    </>
  );
}

export default App;
