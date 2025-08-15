import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout.tsx'
import Inclusao from './Inclusao.tsx'
import Listagem from './Listagem.tsx'
import Pesquisa from './Pesquisa.tsx'
import Favoritos from './Favoritos.tsx'
import Login from './Login.tsx'


const rotas = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <App />},
      { path: 'inclusao', element: <Inclusao />},
      { path: 'listagem', element: <Listagem />},
      { path: 'pesquisa', element: <Pesquisa />},
      { path: 'favoritos', element: <Favoritos />},
      { path: 'login', element: <Login />},
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={rotas} />
  </StrictMode>,
)
