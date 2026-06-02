function Item({ item }) {
  // Define a cor com base no status do laboratório
  const statusClass =
    item.status === "Laboratório Disponível"
      ? "status-disponivel"
      : "status-indisponivel";

  return (
    <div className="card-lab">
      <h3>{item.nome}</h3>
      <span className={statusClass}>{item.status}</span>
      <p className="lab-localizacao">{item.localizacao}</p>
    </div>
  );
}

export default Item;
