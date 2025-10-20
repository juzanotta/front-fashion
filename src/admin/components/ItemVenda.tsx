import { TiDeleteOutline } from "react-icons/ti"
import type { VendaType } from "../../utils/VendaType"
import { useAdminStore } from "../context/AdminContext"
import { toast } from "sonner"

type listaVendaProps = {
  venda: VendaType,
  vendas: VendaType[],
  setVendas: React.Dispatch<React.SetStateAction<VendaType[]>>
}

const apiUrl = import.meta.env.VITE_API_URL

export default function ItemVenda({ venda, vendas, setVendas }: listaVendaProps) {

  const { admin } = useAdminStore()

  async function excluirVenda() {
    if (confirm(`Confirma Exclusão da Venda para "${venda.cliente.nome}"?`)) {
      const response = await fetch(`${apiUrl}/vendas/${venda.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${admin.token}`
          },
        },
      )

      if (response.status == 200) {
        const vendas2 = vendas.filter(x => x.id != venda.id)
        setVendas(vendas2)
        toast.success("Venda excluída com sucesso")
      } else {
        toast.error("Erro... Venda não foi excluída")
      }
    }
  }
  async function handleStatusChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const novoStatus = e.target.value

    if (!admin.token) {
      toast.error("Erro de autenticação. Faça login novamente.")
      return
    }

    try {
      const response = await fetch(`${apiUrl}/vendas/${venda.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${admin.token}`
        },
        body: JSON.stringify({ status: novoStatus })
      })

      if (response.status === 200) {
        toast.success("Status do pedido atualizado!")
        const vendaAtualizada = await response.json()
        setVendas(vendas.map(v => v.id === vendaAtualizada.id ? vendaAtualizada : v))

      } else {
        const erro = await response.json()
        console.error(erro)
        toast.error("Falha ao atualizar o status.")
      }

    } catch (error) {
      console.error(error)
      toast.error("Erro de conexão com a API.")
    }
  }

  return (
    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <img src={venda.produto.foto} alt="Foto do Produto"
          className="w-20 h-20 object-cover"
        />
      </th>
      <td className={"px-6 py-4"}>
        {Number(venda.valor).toLocaleString("pt-br", { style: 'currency', currency: 'BRL' })}
      </td>
      <td className={`px-6 py-4`}>
        {venda.cliente.nome}
      </td>
      <td className={`px-6 py-4`}>
        {venda.cliente.email}
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center space-x-3">
          <select 
            value={venda.status}
            onChange={handleStatusChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="PENDENTE">Pendente</option>
            <option value="ENVIADO">Enviado</option>
            <option value="ENTREGUE">Entregue</option>
            <option value="CANCELADO">Cancelado</option>
          </select>

          <TiDeleteOutline 
            className="text-3xl text-red-600 inline-block cursor-pointer" 
            title="Excluir Venda"
            onClick={excluirVenda} 
          />
        </div>
      </td>
    </tr>
  )
}