import { useEffect, useState } from "react"
import type { VendaType } from "../utils/VendaType"
import ItemVenda from "./components/ItemVenda"
import { useAdminStore } from "./context/AdminContext"

const apiUrl = import.meta.env.VITE_API_URL

function ControleVendas() {
  const [vendas, setVendas] = useState<VendaType[]>([])
  const { admin } = useAdminStore()

  useEffect(() => {
    if (!admin.token) return

    async function getVendas() {
      const response = await fetch(`${apiUrl}/vendas`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer${admin.token}`
        }
      })
      const dados = await response.json()
      setVendas(dados)
    }
    getVendas()
  }, [admin.token])

  const listaVendas = vendas.map(venda => (
    <ItemVenda key={venda.id} venda={venda} vendas={vendas} setVendas={setVendas} />
  ))

  return (
    <div className='m-4 mt-24'>
      <h1 className="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
        Controle de Vendas
      </h1>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Foto do Produto
              </th>
              <th scope="col" className="px-6 py-3">
                Valor R$
              </th>
              <th scope="col" className="px-6 py-3">
                Cliente
              </th>
              <th scope="col" className="px-6 py-3">
                Venda do Cliente
              </th>
              <th scope="col" className="px-6 py-3">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {listaVendas}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ControleVendas