import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useState, useEffect } from "react"
import type { MarcaType } from "../utils/MarcaType"
import { useAdminStore } from "./context/AdminContext"

const apiUrl = import.meta.env.VITE_API_URL

type Inputs = {
  cor: string
  marca: string?
  material: string?
  valor: number
  foto: string
  tipo: string
  tamanho: string
  adminId: string
}

export default function AdminNovoProduto() {
  const { admin } = useAdminStore()

  const {
    register,
    handleSubmit,
    reset,
    setFocus
  } = useForm<Inputs>()

  async function incluirProduto(data: Inputs) {

    const novoProduto: Inputs = {
      cor: data.cor,
      material: data.material,
      marca: data.marca,
      valor: Number(data.valor),
      foto: data.foto,
      tipo: data.tipo,
      tamanho: data.tamanho,
      adminId: admin.id
    }

    const response = await fetch(`${apiUrl}/produtos`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${admin.token}`
        },
        body: JSON.stringify(novoProduto)
      },
    )

    if (response.status == 201) {
      toast.success("Ok! Produto cadastrado com sucesso")
      reset()
    } else {
      toast.error("Erro no cadastro do Produto...")
    }
  }

  return (
    <>
      <h1 className="mb-4 mt-24 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white me-56">
        Inclusão de Produtos
      </h1>

      <form className="max-w-xl mx-auto" onSubmit={handleSubmit(incluirProduto)}>
        <div className="mb-3">
          <label htmlFor="cor" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Cor</label>
          <input type="text" id="cor"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
            {...register("cor")}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="marca" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Marca</label>
          <input type="string" id="marca"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
            {...register("marca")}
          />
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="material" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Material</label>
        <input type="string" id="material"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
          {...register("material")}
        />
      </div>
    </div >
      <div className="grid gap-6 mb-3 md:grid-cols-2">
        <div className="mb-3">
          <label htmlFor="valor" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Valor R$</label>
          <input type="number" id="valor"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
            {...register("valor")}
          />
          <div className="grid gap-6 mb-3 md:grid-cols-2">
            <div className="mb-3">
              <label htmlFor="foto" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                URL da Foto</label>
              <input type="text" id="foto"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
                {...register("foto")}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="tipo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Tipo</label>
              <select id="tipo"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
                {...register("tipo")}
              >
                <option>JAQUETA</option>
                <option>CALCA</option>
                <option>BLUSA</option>
                <option>ACESSORIO</option>
                <option>SAIA</option>
                <option>VESTIDO</option>
                <option>BOLSA</option>
                <option>CALCADO</option>
              </select>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="tamanho" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Tamanho</label>
            <select id="tamanho"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
              {...register("tamanho")}
            >
              <option>PP</option>
              <option>P</option>
              <option>M</option>
              <option>G</option>
              <option>GG</option>
              <option>G1</option>
            </select>
          </div>
        </div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Incluir</button>
      </form>
    </>
  )
}

