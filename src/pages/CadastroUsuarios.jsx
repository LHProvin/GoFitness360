import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { UsuariosContext } from '../context/UsuariosContext';

function CadastroUsuarios() {
  const { cadastrarUsuario } = useContext(UsuariosContext);
  const navigate = useNavigate(); 
  const [novoUsuario, setNovoUsuario] = useState({
    nome: "",
    email: "",
    senha: "",
    cep: "",
    logradouro: "",
    bairro: "",
    cidade: "",
    estado: ""
  });
  const [feedback, setFeedback] = useState(""); 

  const buscarCep = async () => {
    const cep = novoUsuario.cep;
    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        setNovoUsuario(prevState => ({
          ...prevState,
          logradouro: data.logradouro,
          bairro: data.bairro,
          cidade: data.localidade,
          estado: data.uf
        }));
      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
      }
    }
  };

  useEffect(() => {
    buscarCep();
  }, [novoUsuario.cep]);

  const handleCadastro = async () => {
    if (!novoUsuario.nome || !novoUsuario.email || !novoUsuario.senha) {
      setFeedback("Todos os campos são obrigatórios.");
      return;
    }
    try {
      await cadastrarUsuario(novoUsuario);
      setFeedback("Usuário cadastrado com sucesso!");
      navigate('/login'); 
    } catch (error) {
      setFeedback("Erro ao cadastrar usuário: " + error.message);
    }
  };

  return (
    <>
      <h1>Cadastro de usuário</h1>
      <input
        type="text"
        value={novoUsuario.nome}
        placeholder="Digite o nome do usuário"
        onChange={(e) => setNovoUsuario({ ...novoUsuario, nome: e.target.value })}
      />
      <input
        type="email"
        value={novoUsuario.email}
        placeholder="Digite o email do usuário"
        onChange={(e) => setNovoUsuario({ ...novoUsuario, email: e.target.value })}
      />
      <input
        type="password"
        value={novoUsuario.senha}
        placeholder="Digite a senha do usuário"
        onChange={(e) => setNovoUsuario({ ...novoUsuario, senha: e.target.value })}
      />
      <input
        type="text"
        value={novoUsuario.cep}
        placeholder="Digite o CEP"
        onChange={(e) => setNovoUsuario({ ...novoUsuario, cep: e.target.value })}
      />
      <input
        type="text"
        value={novoUsuario.logradouro}
        placeholder="Logradouro"
        readOnly
      />
      <input
        type="text"
        value={novoUsuario.bairro}
        placeholder="Bairro"
        readOnly
      />
      <input
        type="text"
        value={novoUsuario.cidade}
        placeholder="Cidade"
        readOnly
      />
      <input
        type="text"
        value={novoUsuario.estado}
        placeholder="Estado"
        readOnly
      />
      <button onClick={handleCadastro}>Cadastrar</button>
      {feedback && <p>{feedback}</p>} 
    </>
  );
}

export default CadastroUsuarios;




