import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UsuariosContext } from '../context/UsuariosContext';

function Dashboard() {
  const { locais, fetchLocais, editarLocal, removerLocal } = useContext(UsuariosContext);
  const navigate = useNavigate();

  useEffect(() => {
    const verificarAutenticacao = async () => {
      const isAutenticado = localStorage.getItem("isAutenticado");
      if (!isAutenticado) {
        alert("Você precisa estar logado para acessar o Dashboard.");
        navigate("/login");
      } else {
        fetchLocais();
      }
    };

    verificarAutenticacao();
  }, [fetchLocais, navigate]);

  const handleEditarLocal = async (id) => {
    try {
      const local = locais.find(local => local.id === id);
      if (local) {
        navigate(`/editar-local/${id}`);
      } else {
        console.error("Local não encontrado com o ID:", id);
        alert("Local não encontrado! Por favor, verifique se o ID está correto.");
      }
    } catch (error) {
      console.error("Erro ao tentar editar o local:", error);
      alert("Ocorreu um erro ao tentar editar o local. Por favor, tente novamente.");
    }
};


  const handleRemoverLocal = async (id) => {
    const confirmacao = window.confirm("Tem certeza que deseja remover este local?");
    if (confirmacao) {
      try {
        await removerLocal(id);
        alert("Local removido com sucesso!");
      } catch (error) {
        console.error("Erro ao remover local:", error);
      }
    }
  };

  const handleCadastrarLocal = () => {
    navigate('/cadastro-local');
  };

  return (
    <div>
      <h1 style={{
          textAlign: 'center', // Centraliza o texto horizontalmente
          color: '#2c3e50', // Define uma cor escura para o texto
          fontSize: '28px', // Tamanho da fonte grande para destaque
          marginBottom: '20px', // Espaçamento abaixo do título
          fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif', // Fonte moderna e legível
          fontWeight: '600' // Peso da fonte para tornar o texto um pouco mais grosso
        }}>
        Dashboard de Exercícios
      </h1>
      <div style={{ textAlign: 'center' }}>
        {locais.map(local => (
          <div key={local.id} style={{ margin: '10px auto', width: '80%', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', padding: '20px', borderRadius: '5px' }}>
            <h2>{local.nome}</h2>
            <p>{local.descricao}</p>
            <button onClick={() => handleEditarLocal(local.id)} style={{ marginRight: '10px', padding: '10px 20px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px' }}>Editar</button>
            <button onClick={() => handleRemoverLocal(local.id)} style={{ padding: '10px 20px', backgroundColor: '#FF4136', color: 'white', border: 'none', borderRadius: '5px' }}>Remover</button>
          </div>
        ))}
        <div>
          <button onClick={handleCadastrarLocal} style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#2ECC40', color: 'white', border: 'none', borderRadius: '5px' }}>Cadastrar Local de Exercício</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
