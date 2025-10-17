import { TiDeleteOutline } from "react-icons/ti"
import { FaRegStar } from "react-icons/fa"

import type { ProdutoType } from "../../utils/ProdutoType"
import { useAdminStore } from "../context/AdminContext"

interface listaProdutoProps {
  produto: ProdutoType;
  produtos: ProdutoType[];
  setProdutos: React.Dispatch<React.SetStateAction<ProdutoType[]>>;
}

const apiUrl = import.meta.env.VITE_API_URL

export default function ItemProduto({ produto, produtos, setProdutos }: listaProdutoProps) {
  const { admin } = useAdminStore()

  async function excluirProduto() {
    if (!admin || admin.nivel == 1) {
      alert("Você não tem permissão para excluir veículos");
      return;
    }

    if (confirm(`Confirma a exclusão`)) {
      const response = await fetch(`${apiUrl}/produtos/${produto.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${admin.token}`
          },
        },
      )

      if (response.status == 200) {
        const produtos2 = produtos.filter(x => x.id != produto.id)
        setProdutos(produtos2)
        alert("Produto excluído com sucesso")
      } else {
        alert("Erro... Produto não foi excluído")
      }
    }
  }
  
  return (
    <tr key={produto.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <img src={produto.foto} alt={`Foto do ${produto.modelo}`}
          style={{ width: 200 }} />
      </th>
      <td className={`px-6 py-4 ${produto.destaque ? "font-extrabold" : ""}`}>
        {produto.modelo}
      </td>
      <td className={`px-6 py-4 ${produto.destaque ? "font-extrabold" : ""}`}>
        {produto.marca.nome}
      </td>
      <td className={`px-6 py-4 ${produto.destaque ? "font-extrabold" : ""}`}>
        {produto.ano}
      </td>
      <td className={`px-6 py-4 ${produto.destaque ? "font-extrabold" : ""}`}>
        {Number(produto.preco).toLocaleString("pt-br", { minimumFractionDigits: 2 })}
      </td>
      <td className="px-6 py-4">
        <TiDeleteOutline className="text-3xl text-red-600 inline-block cursor-pointer" title="Excluir"
          onClick={excluirProduto} />&nbsp;
        <FaRegStar className="text-3xl text-yellow-600 inline-block cursor-pointer" title="Destacar"
          onClick={alterarDestaque} />
      </td>
    </tr>
  )
}
