import { TiDeleteOutline } from "react-icons/ti"
import { FaRegEdit  } from "react-icons/fa"
import type { VendaType } from "../../utils/VendaType"
import { useAdminStore } from "../context/AdminContext"

type listaVendaProps = {
  venda: VendaType,
  vendas: VendaType[],
  setVendas: React.Dispatch<React.SetStateAction<VendaType[]>>
}

const apiUrl = import.meta.env.VITE_API_URL

export default function ItemVenda({ venda, vendas, setVendas }: listaVendaProps) {

  const { admin } = useAdminStore()

  async function excluirVenda() {

    if (confirm(`Confirma Exclusão da Venda "${venda.descricao}"?`)) {
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
        alert("Venda excluída com sucesso")
      } else {
        alert("Erro... Venda não foi excluída")
      }
    }
  }

  return (
    <tr key={venda.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <img src={venda.produto.foto} alt="Foto do Produto"
          style={{ width: 200 }} />
      </th>
      <td className={"px-6 py-4"}>
        {venda.produto.modelo}
      </td>
      <td className={"px-6 py-4"}>
        {Number(venda.produto.preco).toLocaleString("pt-br", {minimumFractionDigits: 2})}
      </td>
      <td className={`px-6 py-4`}>
        {venda.cliente.nome}
      </td>
      <td className={`px-6 py-4`}>
        {venda.descricao}
      </td>
      <td className={`px-6 py-4`}>
        {venda.resposta}
      </td>
      <td className="px-6 py-4">
        {venda.resposta ? 
          <>
            <img src="/ok.png" alt="Ok" style={{width: 60}} />
          </>
        :
          <>
            <TiDeleteOutline className="text-3xl text-red-600 inline-block cursor-pointer" title="Excluir"
              onClick={excluirVenda} />&nbsp;
            <FaRegEdit className="text-3xl text-yellow-600 inline-block cursor-pointer" title="Destacar"
              onClick={responderVenda} />
          </>
        }
      </td>

    </tr>
  )
}