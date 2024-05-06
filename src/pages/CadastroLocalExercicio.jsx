import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UsuariosContext } from '../context/UsuariosContext';
import './CadastroLocalExercicio.css'; 

function CadastroLocalExercicio() {
  const { cadastrarLocal, editarLocal, locais } = useContext(UsuariosContext);
  const [local, setLocal] = useState({
    nome: "",
    descricao: "",
    cep: "",
    endereco: "",
    tiposDePraticasEsportivas: []
  });
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (local.cep.length === 8) {
      buscarCep();
    }
  }, [local.cep]);

  const buscarCep = async () => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${local.cep}/json/`);
      const data = await response.json();
      setLocal(prevState => ({
        ...prevState,
        endereco: `${data.logradouro}, ${data.bairro}, ${data.localidade}, ${data.uf}`
      }));
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocal(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = async () => {
    if (isEdit) {
      await editarLocal(local);
    } else {
      await cadastrarLocal(local);
    }
    navigate('/dashboard');
  };

  return (
    <div className="container">
      <h1>{isEdit ? 'Editar Local de Exercício' : 'Cadastro de Local de Exercício'}</h1>
      <input
        type="text"
        name="nome"
        value={local.nome}
        placeholder="Nome do Local"
        onChange={handleChange}
      />
      <textarea
        name="descricao"
        value={local.descricao}
        placeholder="Descrição do Local"
        onChange={handleChange}
      />
      <input
        type="text"
        name="cep"
        value={local.cep}
        placeholder="CEP"
        onChange={handleChange}
      />
      <input
        type="text"
        name="endereco"
        value={local.endereco}
        placeholder="Endereço"
        readOnly
      />
      <button onClick={handleSave}>{isEdit ? 'Salvar Alterações' : 'Cadastrar Local'}</button>
    </div>
  );
}

export default CadastroLocalExercicio;