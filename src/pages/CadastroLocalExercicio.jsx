import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UsuariosContext } from '../context/UsuariosContext';

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

  const buscarCep = async () => {
    const cep = local.cep;
    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        setLocal(prevState => ({
          ...prevState,
          endereco: `${data.logradouro}, ${data.bairro}, ${data.localidade}, ${data.uf}`
        }));
      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
      }
    }
  };

  useEffect(() => {
    buscarCep();
  }, [local.cep]);

  const handleSave = async () => {
    if (isEdit) {
      await editarLocal(local);
    } else {
      await cadastrarLocal(local);
    }
    navigate('/dashboard');
  };

  return (
    <>
      <h1>{isEdit ? 'Editar Local de Exercício' : 'Cadastro de Local de Exercício'}</h1>
      <input
        type="text"
        value={local.nome}
        placeholder="Nome do Local"
        onChange={(e) => setLocal({ ...local, nome: e.target.value })}
      />
      <textarea
        value={local.descricao}
        placeholder="Descrição do Local"
        onChange={(e) => setLocal({ ...local, descricao: e.target.value })}
      />
      <input
        type="text"
        value={local.cep}
        placeholder="CEP"
        onChange={(e) => setLocal({ ...local, cep: e.target.value })}
      />
      <input
        type="text"
        value={local.endereco}
        placeholder="Endereço"
        readOnly
      />
      <button onClick={handleSave}>{isEdit ? 'Salvar Alterações' : 'Cadastrar Local'}</button>
    </>
  );
}

export default CadastroLocalExercicio;

