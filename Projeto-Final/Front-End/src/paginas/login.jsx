import { useState } from "react";

import "../css-classes/login.css";

const MAX_TENTATIVAS = 3;
const TEMPO_BLOQUEIO_MS = 1 * 60 * 1000; // 1 minuto
const STORAGE_KEY_TENTATIVAS = "loginTentativas";

function Login({ setPagina }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);

  // Gera hash PBKDF2 com salt usando Web Crypto API
  const gerarHashPBKDF2 = async (senha, salt) => {
    const encoder = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      encoder.encode(senha),
      "PBKDF2",
      false,
      ["deriveBits"],
    );
    const derivedBits = await crypto.subtle.deriveBits(
      {
        name: "PBKDF2",
        salt: encoder.encode(salt),
        iterations: 100000,
        hash: "SHA-256",
      },
      keyMaterial,
      256,
    );
    const hashArray = Array.from(new Uint8Array(derivedBits));

    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  };
  
  gerarHashPBKDF2("noletudo", "ufpi-admin-2026").then(console.log);

  // Consulta estado do bloqueio por tentativas
  const verificarBloqueio = () => {
    const stored = localStorage.getItem(STORAGE_KEY_TENTATIVAS);
    if (!stored) return null;

    const { count, primeiroBloqueio } = JSON.parse(stored);
    const agora = Date.now();

    if (count >= MAX_TENTATIVAS) {
      if (agora - primeiroBloqueio < TEMPO_BLOQUEIO_MS) {
        const minutosRestantes = Math.ceil(
          (TEMPO_BLOQUEIO_MS - (agora - primeiroBloqueio)) / 60000,
        );
        return {
          bloqueado: true,
          mensagem: `Muitas tentativas. Tente novamente em ${minutosRestantes} minuto(s).`,
        };
      }
      // Reseta após o tempo de bloqueio
      localStorage.removeItem(STORAGE_KEY_TENTATIVAS);
    }

    return { bloqueado: false, tentativasRestantes: MAX_TENTATIVAS - count };
  };

  // Registra uma tentativa falha
  const registrarTentativaFalha = () => {
    const stored = localStorage.getItem(STORAGE_KEY_TENTATIVAS);
    const agora = Date.now();

    if (!stored) {
      localStorage.setItem(
        STORAGE_KEY_TENTATIVAS,
        JSON.stringify({ count: 1, primeiroBloqueio: agora }),
      );
    } else {
      const dados = JSON.parse(stored);
      // Se passou do tempo de bloqueio, reseta contagem
      if (agora - dados.primeiroBloqueio >= TEMPO_BLOQUEIO_MS) {
        localStorage.setItem(
          STORAGE_KEY_TENTATIVAS,
          JSON.stringify({ count: 1, primeiroBloqueio: agora }),
        );
      } else {
        dados.count += 1;
        localStorage.setItem(
          STORAGE_KEY_TENTATIVAS,
          JSON.stringify(dados),
        );
      }
    }
  };

  // Limpa o registro de tentativas (login bem-sucedido)
  const limparTentativas = () => {
    localStorage.removeItem(STORAGE_KEY_TENTATIVAS);
  };

  // Valida o formato do e-mail (regex simples)
  const emailValido = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    // Verifica bloqueio antes de qualquer validação
    const bloqueio = verificarBloqueio();
    if (bloqueio?.bloqueado) {
      setErro(bloqueio.mensagem);
      return;
    }

    const emailLimpo = email.trim();

    // Validação: campos vazios
    if (!emailLimpo || !senha.trim()) {
      setErro("Preencha todos os campos.");
      return;
    }

    // Validação: formato de e-mail
    if (!emailValido(emailLimpo)) {
      setErro("Insira um e-mail válido.");
      return;
    }

    try {
      const resposta = await fetch("/dados/usuarios.json");

      if (!resposta.ok) {
        setErro("Erro ao carregar dados de usuários.");
        return;
      }

      const usuarios = await resposta.json();

      // Procura o usuário pelo email
      const usuarioEncontrado = usuarios.find(
        (u) => u.email === emailLimpo,
      );

      if (usuarioEncontrado) {
        // Gera hash PBKDF2 com o salt do usuário
        const senhaHash = await gerarHashPBKDF2(
          senha,
          usuarioEncontrado.salt,
        );

        if (senhaHash === usuarioEncontrado.senhaHash) {
          // Login bem-sucedido — limpa tentativas e salva sessão
          limparTentativas();

          localStorage.setItem(
            "usuario",
            JSON.stringify({
              nome: usuarioEncontrado.nome,
              email: usuarioEncontrado.email,
            }),
          );

          // Cookie de sessão (expira em 1 hora)
          document.cookie =
            "sessaoAdmin=true; max-age=3600; path=/; SameSite=Lax";

          setPagina("admin");
          return;
        }
      }

      // Credencial inválida — registra tentativa falha
      registrarTentativaFalha();
      setErro("E-mail ou senha inválidos.");
    } catch {
      setErro("Erro de conexão. Tente novamente.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <i className="fas fa-user-shield login-icone"></i>
          <h2>Acesso Administrativo</h2>
          <p>Entre com suas credenciais para acessar o painel</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <div className="login-campo">
            <label htmlFor="login-email">E-mail</label>
            <div className="login-input-wrapper">
              <i className="fas fa-envelope input-icon"></i>
              <input
                id="login-email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />
            </div>
          </div>

          <div className="login-campo">
            <label htmlFor="login-senha">Senha</label>
            <div className="login-input-wrapper">
              <i className="fas fa-lock input-icon"></i>
              <input
                id="login-senha"
                type={mostrarSenha ? "text" : "password"}
                placeholder="Sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              <button
                type="button"
                className="login-eye-btn"
                onClick={() => setMostrarSenha((prev) => !prev)}
                aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                tabIndex={-1}
              >
                <i
                  className={`fas ${mostrarSenha ? "fa-eye" : "fa-eye-slash"}`}
                ></i>
              </button>
            </div>
          </div>

          {erro && (
            <div className="login-erro" role="alert">
              <i className="fas fa-exclamation-circle"></i>
              <span>{erro}</span>
            </div>
          )}

          <button type="submit" className="login-btn">
            <i className="fas fa-sign-in-alt"></i>
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
