import "./css-classes/carrossel.css";
import sinfo3 from "./assets/sinfo.jpeg";

function Carrossel() {
  return (
    <div className="container-cards">

      {/* CARD 1 */}
      <a
        href="https://www.instagram.com/sinfo.ufpi.cshnb/"
        target="_blank"
        rel="noopener noreferrer"
        className="card"
      >
        <img 
          src={sinfo3}  
          alt="SINFO"
          className="card-img"
        />
        <p>Confira quando será o XV Simpósio de Sistemas de Informação (Sinfo) no ano de 2026 <strong>pelo Instagram</strong>.</p>
      </a>

      {/* CARD 2 */}
      <div className="card">
        <a 
          href="https://sinfo-ufpi.com.br/?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQPOTM2NjE5NzQzMzkyNDU5AAGnsX-c-jE2eBEmQE4Q2vzdlFrH8jyqXFPBF2ojjLu3lBBU-V52WHM_QKKo7SY_aem_GJSCSGjwMi_Bm_nVcUOYOQ"
          target="_blank"
        >
        <img 
          src={sinfo3} 
          alt="Professores"
          className="card-img"
        />
        <p>Confira quando será o XV Simpósio de Sistemas de Informação (Sinfo) no ano de 2026 <strong>pelo site</strong>.</p>
        </a>
      </div>

    </div>
  );
}

export default Carrossel;