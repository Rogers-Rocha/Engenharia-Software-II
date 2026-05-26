import { useState } from "react";
import Header from "./Header.jsx";
import Menu from "./Menu.jsx";
import "./App.css";

function App() {
  const [menuIsOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuIsOpen);

  const tempHome = () => alert("Abrindo Home...");

  const tempPesquisa = (inputPesquisa) =>
    alert(`Pesquisando ${inputPesquisa}...`);

  return (
    <>
      <Header
        goToHome={tempHome}
        openMenu={toggleMenu}
        fazerPesquisa={tempPesquisa}
      />

      <Menu isOpen={menuIsOpen} toggleMenu={toggleMenu} options={<></>} />

      <main className="container-lg">
        <h2>Bem-vindo ao Site S.I.</h2>
        <p>A navegação do seu site agora está modularizada!</p>
      </main>
    </>
  );
}

export default App;
