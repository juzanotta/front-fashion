import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useAdminStore } from "./context/AdminContext"

const apiUrl = import.meta.env.VITE_API_URL

type Inputs = {
    cor: string
    marca?: string
    material?: string
    valor: number
    foto: string
    tamanho: string
    tipo: string
    adminId: string
}

export default function Inclusao() {
    const { admin } = useAdminStore()

    const {
        register,
        handleSubmit,
        reset,
    } = useForm<Inputs>()


    async function incluirProduto(data: Inputs) {

        const novoProduto: Inputs = {
            cor: data.cor,
            marca: data.marca,
            material: data.material,
            valor: Number(data.valor),
            foto: data.foto,
            tamanho: data.tamanho,
            tipo: data.tipo,
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
        <div className="bg-[#F1EEE7] min-h-screen pt-24 pl-10  flex">

            <h1 className="font-serif text-[#C33941] text-4xl  ">novo produto</h1>
            <div className="flex flex-col items-center flex-grow pr-105 pt-5">
                <div className=" rounded-lg  dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <form className="space-y-4 md:space-y-6"
                            onSubmit={handleSubmit(incluirProduto)} >
                            <div>
                                <label htmlFor="tipo" className="block mb-2 text-sm font-normal text-[#C33941] dark:text-white pl-2">tipo da peça</label>
                                <select
                                    id="tipo"
                                    defaultValue=""
                                    required
                                    className="bg-[#F1EEE7] border border-[#C33941] text-[#C33941] rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-100 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    {...register("tipo")}>
                                    <option value="" disabled hidden></option>
                                    <option value="CALCA" className="bg-[#F1EEE7] font-regular text-[#C33941]">calça</option>
                                    <option value="BLUSA" className="bg-[#F1EEE7] font-regular text-[#C33941]">blusa</option>
                                    <option value="ACESSORIO" className="bg-[#F1EEE7] font-regular text-[#C33941]">acessório</option>
                                    <option value="SAIA" className="bg-[#F1EEE7] font-regular text-[#C33941]">saia</option>
                                    <option value="VESTIDO" className="bg-[#F1EEE7] font-regular text-[#C33941]">vestido</option>
                                    <option value="BOLSA" className="bg-[#F1EEE7] font-regular text-[#C33941]">bolsa</option>
                                    <option value="CALCADO" className="bg-[#F1EEE7] font-regular text-[#C33941]">sapato</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="cor" className="block mb-2 text-sm font-normal text-[#C33941] dark:text-white pl-2">cor da peça</label>
                                <input type="text" id="cor"
                                    className="bg-[#F1EEE7] border border-[#C33941] text-[#C33941] rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-100 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                    {...register("cor")} />
                            </div>

                            <div>
                                <label htmlFor="marca" className="block mb-2 text-sm font-normal text-[#C33941] dark:text-white pl-2">marca (opcional)</label>
                                <input type="text" id="marca"
                                    className="bg-[#F1EEE7] border border-[#C33941] text-[#C33941] rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-100 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    {...register("marca")}
                                />
                            </div>

                            <div>
                                <label htmlFor="material" className="block mb-2 text-sm font-normal text-[#C33941] dark:text-white pl-2">material (opcional)</label>
                                <input type="text" id="material"
                                    className="bg-[#F1EEE7] border border-[#C33941] text-[#C33941] rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-100 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    {...register("material")}
                                />
                            </div>

                            <div>
                                <label htmlFor="tamanho" className="block mb-2 text-sm font-normal text-[#C33941] dark:text-white pl-2">tamanho</label>
                                <select id="tamanho" defaultValue="" required
                                    className="bg-[#F1EEE7] border border-[#C33941] text-[#C33941] rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-100 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    {...register("tamanho")}>
                                    <option value="" disabled hidden></option>
                                    <option value="PP" className="bg-[#F1EEE7] font-regular text-[#C33941]">pp</option>
                                    <option value="P" className="bg-[#F1EEE7] font-regular text-[#C33941]">p</option>
                                    <option value="M" className="bg-[#F1EEE7] font-regular text-[#C33941]">m</option>
                                    <option value="G" className="bg-[#F1EEE7] font-regular text-[#C33941]">g</option>
                                    <option value="GG" className="bg-[#F1EEE7] font-regular text-[#C33941]">gg</option>
                                    <option value="G1" className="bg-[#F1EEE7] font-regular text-[#C33941]">g1</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="valor" className="block mb-2 text-sm font-normal text-[#C33941] dark:text-white pl-2">valor</label>
                                <input type="number" id="valor"
                                    className="bg-[#F1EEE7] border border-[#C33941] text-[#C33941] rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-100 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                    {...register("valor", { valueAsNumber: true })}
                                />
                            </div>


                            <div>
                                <label htmlFor="foto" className="block mb-2 text-sm font-normal text-[#C33941] dark:text-white pl-2">foto (url)</label>
                                <input type="text" id="foto"
                                    className="bg-[#F1EEE7] border border-[#C33941] text-[#C33941] rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-100 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                    {...register("foto")}
                                />
                            </div>

                            <button type="submit" className=" w-40 block mx-auto text-[#F1EEE7] bg-[#C33941] rounded-lg hover:bg-[#F1EEE7] hover:text-[#C33941] border border-[#C33941] focus:ring-4 focus:outline-none focus:ring-[#C33941] font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer">
                                enviar!
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}