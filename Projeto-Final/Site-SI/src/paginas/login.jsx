// src/paginas/login.jsx
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

import "../css-classes/login.css";

const MAX_TENTATIVAS = 3;
const TEMPO_BLOQUEIO_MS = 1 * 60 * 1000;
const STORAGE_KEY_TENTATIVAS = "loginTentativas";

function Login({ setPagina }) {
  const [email, setEmail]               = useState("");
  const [senha, setSenha]               = useState("");
  const [erro, setErro]                 = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [carregando, setCarregando]     = useState(false);

  // ─── Bloqueio por tentativas ──────────────────────────────
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
      localStorage.removeItem(STORAGE_KEY_TENTATIVAS);
    }
    return { bloqueado: false };
  };

  const registrarTentativaFalha = () => {
    const stored = localStorage.getItem(STORAGE_KEY_TENTATIVAS);
    const agora  = Date.now();

    if (!stored) {
      localStorage.setItem(
        STORAGE_KEY_TENTATIVAS,
        JSON.stringify({ count: 1, primeiroBloqueio: agora }),
      );
    } else {
      const dados = JSON.parse(stored);
      if (agora - dados.primeiroBloqueio >= TEMPO_BLOQUEIO_MS) {
        localStorage.setItem(
          STORAGE_KEY_TENTATIVAS,
          JSON.stringify({ count: 1, primeiroBloqueio: agora }),
        );
      } else {
        dados.count += 1;
        localStorage.setItem(STORAGE_KEY_TENTATIVAS, JSON.stringify(dados));
      }
    }
  };

  const limparTentativas = () => localStorage.removeItem(STORAGE_KEY_TENTATIVAS);

  const emailValido = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // ─── Submit ───────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    const bloqueio = verificarBloqueio();
    if (bloqueio?.bloqueado) {
      setErro(bloqueio.mensagem);
      return;
    }

    const emailLimpo = email.trim();

    if (!emailLimpo || !senha.trim()) {
      setErro("Preencha todos os campos.");
      return;
    }

    if (!emailValido(emailLimpo)) {
      setErro("Insira um e-mail válido.");
      return;
    }

    setCarregando(true);

    try {
      // Firebase cuida do hash, salt e validação 
      const credencial = await signInWithEmailAndPassword(auth, emailLimpo, senha);
      const usuario    = credencial.user;

      limparTentativas();

      // Salva dados mínimos no localStorage para o admin.jsx exibir
      localStorage.setItem(
        "usuario",
        JSON.stringify({ nome: usuario.displayName || "Administrador", email: usuario.email }),
      );

      setPagina("admin");

    } catch (error) {
      // Códigos de erro do Firebase Auth
      const errosConhecidos = [
        "auth/user-not-found",
        "auth/wrong-password",
        "auth/invalid-credential",
        "auth/invalid-email",
      ];

      if (errosConhecidos.includes(error.code)) {
        registrarTentativaFalha();
        setErro("E-mail ou senha inválidos.");
      } else {
        setErro("Erro de conexão. Tente novamente.");
      }
    } finally {
      setCarregando(false);
    }
  };

  // ─── JSX ─────────
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
                disabled={carregando}
                autoComplete="username"
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
                disabled={carregando}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="login-eye-btn"
                onClick={() => setMostrarSenha((prev) => !prev)}
                aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                tabIndex={-1}
              >
                <i className={`fas ${mostrarSenha ? "fa-eye" : "fa-eye-slash"}`}></i>
              </button>
            </div>
          </div>

          {erro && (
            <div className="login-erro" role="alert">
              <i className="fas fa-exclamation-circle"></i>
              <span>{erro}</span>
            </div>
          )}

          <button type="submit" className="login-btn" disabled={carregando}>
            {carregando
              ? <><i className="fas fa-spinner fa-spin"></i> Entrando...</>
              : <><i className="fas fa-sign-in-alt"></i> Entrar</>
            }
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;