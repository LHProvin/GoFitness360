import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { UsuariosContextProvider } from './context/UsuariosContext.jsx';

import CadastroUsuarios from "./pages/CadastroUsuarios.jsx";
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Lista from './pages/Lista.jsx';
import BuscarCep from "./pages/BuscarCep.jsx";
import CadastroLocalExercicio from './pages/CadastroLocalExercicio.jsx';
import CadastroExercicio from './pages/CadastroExercicio.jsx';

let isAutenticado = JSON.parse(localStorage.getItem("isAutenticado")) || false;

const PrivateRoute = ({ children }) => {
  return isAutenticado ? children : <Navigate to="/login" />;
};

const rotas = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/cadastro",
    element: <CadastroUsuarios />
  },
  {
    path: '/',
    element: (
      <PrivateRoute>
        <App />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/", 
        element: <Dashboard />
      },
      {
        path: "/lista/:id",
        element: <Lista />
      },
      {
        path: "/cep",
        element: <BuscarCep />
      },
      {
        path: "/cadastro-local",
        element: (
          <PrivateRoute>
            <CadastroLocalExercicio /> // Corrigido aqui
          </PrivateRoute>
        )
      },
      {
        path: "/cadastro-exercicio",
        element: (
          <PrivateRoute>
            <CadastroExercicio />
          </PrivateRoute>
        )
      },
      {
        path: "/editar-exercicio/:id",
        element: (
          <PrivateRoute>
            <CadastroExercicio />
          </PrivateRoute>
        )
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <UsuariosContextProvider>
    <RouterProvider router={rotas} />
  </UsuariosContextProvider>
);
