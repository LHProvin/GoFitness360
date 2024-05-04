import React, { createContext, useState, useEffect } from 'react';

export const UsuariosContext = createContext();

export const UsuariosContextProvider = ({ children }) => {
    const [usuarios, setUsuarios] = useState([]);
    const [locais, setLocais] = useState([]);

    useEffect(() => {
        fetchUsuarios();
        fetchLocais();
    }, []);

    const buscarCep = async (cep) => {
      if (cep.length === 8) {
        try {
          const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
          const data = await response.json();
          return { logradouro: data.logradouro, bairro: data.bairro, cidade: data.localidade, uf: data.uf };
        } catch (error) {
          console.error('Erro ao buscar dados do CEP:', error);
          return {};
        }
      }
      return {};
    };

    const fetchUsuarios = async () => {
      try {
          const response = await fetch('http://localhost:4000/usuarios');
          const data = await response.json();
          setUsuarios(data);
      } catch (error) {
          console.error('Erro ao buscar usuários:', error);
      }
    };

    const fetchLocais = async () => {
      try {
          const response = await fetch('http://localhost:4000/locais');
          const data = await response.json();
          setLocais(data);
      } catch (error) {
          console.error('Erro ao buscar locais:', error);
      }
    };

    const login = async (email, senha) => {
      console.log(`Logging in with email: ${email}, senha: ${senha}`); 
      try {
        const response = await fetch(`http://localhost:4000/usuarios?email=${email}&senha=${senha}`);
        const usuarios = await response.json();
        console.log(usuarios); // Verifique o que está sendo retornado
        return usuarios.length > 0;
      } catch (error) {
        console.error("Erro ao realizar login:", error);
        return false;
      }
    };
    
    

    const cadastrarUsuario = async (usuario) => {
        try {
            const response = await fetch('http://localhost:4000/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(usuario)
            });
            if (response.ok) {
                fetchUsuarios();
            } else {
                throw new Error('Falha ao cadastrar usuário');
            }
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
        }
    };

    const editarUsuario = async (id, usuario) => {
        try {
            const response = await fetch(`http://localhost:4000/usuarios/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(usuario)
            });
            if (response.ok) {
                fetchUsuarios();
            } else {
                throw new Error('Falha ao editar usuário');
            }
        } catch (error) {
            console.error('Erro ao editar usuário:', error);
        }
    };

    const removerUsuario = async (id) => {
        const locaisVinculados = locais.filter(l => l.usuarioId === id);
        if (locaisVinculados.length > 0) {
            alert('Não é possível remover o usuário pois existem locais de exercícios vinculados.');
            return;
        }
        try {
            const response = await fetch(`http://localhost:4000/usuarios/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                fetchUsuarios();
            } else {
                throw new Error('Falha ao remover usuário');
            }
        } catch (error) {
            console.error('Erro ao remover usuário:', error);
        }
    };

    const cadastrarLocal = async (local) => {
        try {
            const response = await fetch('http://localhost:4000/locais', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(local)
            });
            if (response.ok) {
                fetchLocais();
            } else {
                throw new Error('Falha ao cadastrar local');
            }
        } catch (error) {
            console.error('Erro ao cadastrar local:', error);
        }
    };

    const editarLocal = async (id, local) => {
        try {
            const response = await fetch(`http://localhost:4000/locais/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(local)
            });
            if (response.ok) {
                fetchLocais();
            } else {
                throw new Error('Falha ao editar local');
            }
        } catch (error) {
            console.error('Erro ao editar local:', error);
        }
    };

    const removerLocal = async (id) => {
        try {
            const response = await fetch(`http://localhost:4000/locais/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                fetchLocais();
            } else {
                throw new Error('Falha ao remover local');
            }
        } catch (error) {
            console.error('Erro ao remover local:', error);
        }
    };

    return (
        <UsuariosContext.Provider value={{
            usuarios,
            locais,
            login,
            buscarCep,
            cadastrarUsuario,
            editarUsuario,
            removerUsuario,
            cadastrarLocal,
            editarLocal,
            removerLocal
        }}>
            {children}
        </UsuariosContext.Provider>
    );
};

