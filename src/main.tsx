import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './index.css'
import App from './App.tsx'
import Layout from './Layout.tsx'
import Listagem from './Listagem.tsx'
import Favoritos from './Favoritos.tsx'
import Login from './Login.tsx'
import CadCliente from './CadCliente.tsx'
import PaginaCompra from './PaginaCompra.tsx'

import AdminLayout from './admin/AdminLayout.tsx';
import AdminLogin from './admin/AdminLogin.tsx';            
import AdminDashboard from './admin/AdminDashboard.tsx';
import Inclusao from './admin/Inclusao.tsx'
import AdminVendas from './admin/AdminVendas.tsx'; 


const rotas = createBrowserRouter([
    {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "vendas", element: <AdminVendas /> },  // ...
      { path: "produtos", element: <Inclusao /> }
    ],
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <App /> },
      { path: "listagem", element: <Listagem /> },
      { path: "produtos", element: <Listagem /> }, 
      { path: "pesquisa", element: <Listagem /> },
      { path: "favoritos", element: <Favoritos /> },
      { path: 'cadCliente', element: <CadCliente /> },
      { path: "login", element: <Login /> },
      { path: "comprar/:id", element: <PaginaCompra /> }
    ],
  },
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={rotas} />
  </StrictMode>,
)
