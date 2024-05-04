import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UsuariosContext } from '../context/UsuariosContext';

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
        navigate("/dashboard");
      } else {
        alert("Usuário ou senha incorretos!");
      }
    } catch (error) {
      alert("Falha ao fazer login: " + error.message);
    }
  };
  
  

  const navegarParaCadastro = () => {
    navigate("/cadastro"); // Navega para a página de cadastro
  };

  return (
    <>
      <h1>Login</h1>
      <input
        type="email"
        value={usuario.email}
        placeholder="Digite o email do usuário"
        onChange={(evento) => setUsuario({ ...usuario, email: evento.target.value })}
      />
      <input
        type="password"
        value={usuario.senha}
        placeholder="Digite a senha do usuário"
        onChange={(evento) => setUsuario({ ...usuario, senha: evento.target.value })}
      />
      <button onClick={realizarLogin}>Entrar</button>
      <button onClick={navegarParaCadastro}>Cadastrar</button>
    </>
  );
}

export default Login;




