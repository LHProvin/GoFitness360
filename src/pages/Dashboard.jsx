import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { UsuariosContext } from '../context/UsuariosContext';

function Dashboard() {
  const { locais, fetchLocais, editarLocal, removerLocal, login } = useContext(UsuariosContext);
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
  }, [fetchLocais, navigate, login]);

  const handleEditarLocal = async (id) => {
    try {
      const local = locais.find(local => local.id === id);
      if (local) {
        navigate(`/editar-local/${id}`); 
      } else {
        console.error("Local não encontrado com o ID:", id);
      }
    } catch (error) {
      console.error("Erro ao editar local:", error);
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

  return (
    <div>
      <h1>Dashboard de Exercícios</h1>
      {locais.map(local => (
        <div key={local.id}>
          <h2>{local.nome}</h2>
          <p>{local.descricao}</p>
          <button onClick={() => handleEditarLocal(local.id)}>Editar</button>
          <button onClick={() => handleRemoverLocal(local.id)}>Remover</button>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;

