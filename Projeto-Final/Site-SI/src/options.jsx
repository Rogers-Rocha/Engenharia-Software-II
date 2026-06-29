import "./App.css";

// Handler para abrir/fechar folders do menu principal
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

// Adiciona o handler para cada um dos objetos
export function addHandlers(options, handler) {
  for (const [key, value] of Object.entries(options)) {
    if (value.type == "item") {
      options[key].handler = handler[key] ?? handler;
    } else if (value.type == "folder") {
      // Adiciona o handler específico para folders
      options[key].handler = handleToggleFolder;
      // Adiciona os handlers de cada um das opções dentro do folder
      for (const innerKey of Object.keys(value.items)) {
        options[key].items[innerKey].handler = handler[innerKey] ?? handler;
      }
    }
  }
}

// Retorna um componente contendo as opções de um folder
const expandFolder = (folder) => (
  <ul style={{ display: "none" }}>
    {Object.values(folder.items).map((option, index) => (
      <li key={index}>
        <a className="menu-item" href={option.href} onClick={option.handler}>
          <span className="content">{option.name}</span>
        </a>
      </li>
    ))}
  </ul>
);

// Converte um objeto em uma das opções para o componente do menu principal
export function objToOpt(option, index) {
  const addSeta = (
    <span className="support">
      <i className="fas fa-angle-down" />
    </span>
  );

  return (
    <div className="menu-folder" key={index}>
      <a className="menu-item" href={option.href} onClick={option.handler}>
        <span className="content">{option.name}</span>
        {option.type === "folder" ? addSeta : <></>}
      </a>
      {option.type === "folder" ? expandFolder(option) : <></>}
    </div>
  );
}
