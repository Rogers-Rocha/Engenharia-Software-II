import { useState, useEffect } from "react";

import "../css-classes/cookieBanner.css";

function CookieBanner() {
  const [aceitou, setAceitou] = useState(false);

  useEffect(() => {
    // Verifica se o cookie "aceitouCookies" já existe
    const cookies = document.cookie
      .split("; ")
      .find((row) => row.startsWith("aceitouCookies="));

    if (cookies) {
      setAceitou(true);
    }
  }, []);

  const aceitarCookies = () => {
    // Salva o cookie com validade de 30 dias
    document.cookie =
      "aceitouCookies=true; max-age=2592000; path=/"; // 30 dias = 2592000 segundos
    setAceitou(true);
  };

  // Se já aceitou, não renderiza nada
  if (aceitou) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-label="Aviso de cookies">
      <div className="cookie-banner-container">
        <div className="cookie-banner-texto">
          <i className="fas fa-cookie-bite" aria-hidden="true"></i>
          <span>
            Este site utiliza cookies para melhorar a experiência do usuário.
          </span>
        </div>
        <button
          className="cookie-banner-btn"
          type="button"
          onClick={aceitarCookies}
        >
          Entendi
        </button>
      </div>
    </div>
  );
}

export default CookieBanner;
