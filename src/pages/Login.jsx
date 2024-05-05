import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UsuariosContext } from '../context/UsuariosContext';
import './Login.css';  

function Login() {
  const { login } = useContext(UsuariosContext);
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({
    email: "",
    senha: ""
  });

  const realizarLogin = async () => {
    console.log(`Attempting to login with email: ${usuario.email}, senha: ${usuario.senha}`);
    try {
      const resultadoLogin = await login(usuario.email, usuario.senha);
      if (resultadoLogin) {
        localStorage.setItem("isAuteticado", true);
        window.location.href = "/";
      } else {
        alert("Usuário ou senha incorretos!");
      }
    } catch (error) {
      alert("Falha ao fazer login: " + error.message);
    }
  };
  
  const navegarParaCadastro = () => {
    navigate("/cadastro"); 
  }; 

  return (
    <div className="login-container">
      <form className="login-form">
        <h1>Login</h1>
        <input
          type="email"
          value={usuario.email}
          className="login-input"
          placeholder="Digite o email do usuário"
          onChange={(evento) => setUsuario({ ...usuario, email: evento.target.value })}
        />
        <input
          type="password"
          value={usuario.senha}
          className="login-input"
          placeholder="Digite a senha do usuário"
          onChange={(evento) => setUsuario({ ...usuario, senha: evento.target.value })}
        />
        <button onClick={realizarLogin} className="login-button">Entrar</button>
        <button onClick={navegarParaCadastro} className="login-button">Cadastrar</button>
      </form>
    </div>
  );
}

export default Login;




