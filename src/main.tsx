import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './index.css'
import App from './App.tsx'
import Layout from './Layout.tsx'
import Listagem from './Listagem.tsx'
import Favoritos from './Favoritos.tsx'
import Login from './Login.tsx'

import Inclusao from './admin/Inclusao.tsx'
import AdminLayout from './admin/AdminLayout.tsx';
import AdminLogin from './admin/AdminLogin.tsx';            
import AdminDashboard from './admin/AdminDashboard.tsx';
import AdminVendas from './admin/AdminVendas.tsx'; 


const rotas = createBrowserRouter([
    {
    path: "/admin/login",
    element: <AdminLogin />,   // rota do form de login sem o Layout da Área Administrativa
  },
  {
    path: "/admin",
    element: <AdminLayout />,  // layout principal do admin com menus e outlet
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "vendas", element: <AdminVendas /> },  // ...
    ],
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <App /> },
      { path: "inclusao", element: <Inclusao /> },
      { path: "listagem", element: <Listagem /> },
      { path: "produtos", element: <Listagem /> }, 
      { path: "pesquisa", element: <Listagem /> },
      { path: "favoritos", element: <Favoritos /> },
      { path: "login", element: <Login /> },
    ],
  },
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={rotas} />
  </StrictMode>,
)
