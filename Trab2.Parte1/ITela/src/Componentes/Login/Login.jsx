// componente principal com formulário de login
import { FaUser, FaLock } from "react-icons/fa";

import { useState } from "react"; // para mudança de estado

import "./Login.css";

const Login = () => {
// username vai consultar o email
// setUsername vai alterar o email
// faz o mesma lógica para a senha
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

// função para o envio do form. Será ativada assim que o form for preenchido e o botão "Entrar" for clicado.
    const handleSubmit = (event) => {
/*event + event.preventDefaut previne que o form seja recarregado e que seja enviado antes de preencher os campos*/
        event.preventDefault();

        alert("Enviando os dados: " + username + " - " + password);
    };

  return (
    <div className="container">
{/*onSubmit é uma propriedade que precisa de uma função */}
        <form onSubmit={handleSubmit}>
            <h1>Entrar no sistema</h1>
            <div className="input-field">
                <label>Usuário:</label> 
                <input 
                  type="email" 
                  placeholder="E-mail"
// "required" serve para indicar para o usuário de que ele deve preencher esse campo. Então só envia depois que o campo for obrigatório
                  autoFocus
                  required
// setUsername vai pegar o email atualizado
                  onChange={(e) => setUsername(e.target.value)}
// "e" é o evento, "target" é o input alvo, e o "value" é o valor que está sendo digitado. Ou seja, vai pegar o evento "usuário digitando" e extrair esse valor do input
                /> 
                <FaUser className="icon" />
            </div>

            <div className="input-field"> 
                <label>Senha:</label>
                <input 
                  className="alinha"
                  type="password" 
                  placeholder="Senha"
                  required
                  onChange={(e) => setPassword(e.target.value)} 
                />
                <FaLock className="icon" />
            </div>

            <button>Entrar</button>
            {/* lembre-se de mim */}
            <div className="recall-forget">
                <label>
                    <input type="checkbox" />
                    Lembre de mim?
                </label>
                <a href="#">Esqueceu a senha?</a>
            </div>

            

            <div className="signup-link">
                <p>Não possui uma conta?<a href="#">Registre-se</a></p>
            </div>
        </form>
    </div>
  )
}

export default Login
