import "./App.css";

import Carrossel from "./componentes/carrossel";

function Home() {
  return (
    <div className="container-lg">
      <h2>Bem Vindo ao Site do Curso de Sistemas de Informações</h2>
      <p>Agora com navegação dinâmica</p>

      <Carrossel />
    </div>
  );
}

export default Home;
