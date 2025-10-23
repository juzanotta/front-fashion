import { useEffect, useState } from "react"
import type { VendaType } from "../utils/VendaType"
import ItemVenda from "./components/ItemVenda"
import { useAdminStore } from "./context/AdminContext"
import { toast } from "sonner"

const apiUrl = import.meta.env.VITE_API_URL

function ControleVendas() {
  const [vendas, setVendas] = useState<VendaType[]>([])
  const { admin } = useAdminStore()

  useEffect(() => {
    if (!admin.token) return

    async function getVendas() {
      try {
        const response = await fetch(`${apiUrl}/vendas`, {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer${admin.token}`
          }
        })
        if (!response.ok) {
          const erro = await response.json()
          console.error("Erro ao buscar vendas:", erro)
          toast.error("Não foi possível carregar as vendas.")
          return
        }
        const dados = await response.json()

        if (Array.isArray(dados)) {
          setVendas(dados)
        } else {
          console.error("A API não retornou um array:", dados)
          toast.error("Resposta inesperada do servidor.")
        }

      } catch (error) {
        console.error("Erro de conexão:", error)
        toast.error("Erro de rede ao buscar vendas.")
      }
    }
    getVendas()
  }, [admin.token])

  const listaVendas = vendas.map(venda => (
    <ItemVenda key={venda.id} venda={venda} vendas={vendas} setVendas={setVendas} />
  ))

  return (
    <div className='bg-[#F1EEE7] min-h-screen pt-24 pl-10 font-sans'>
      <h1 className="font-serif text-[#C33941] text-4xl pb-10">controle de vendas</h1>

      <div className="relative overflow-x-auto  sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-medium text-[#C33941] font-normal bg-[#F1EEE7] dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                foto do produto
              </th>
              <th scope="col" className="px-6 py-3">
                valor R$
              </th>
              <th scope="col" className="px-6 py-3">
                cliente
              </th>
              <th scope="col" className="px-6 py-3">
                venda do cliente
              </th>
              <th scope="col" className="px-6 py-3">
                ações
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