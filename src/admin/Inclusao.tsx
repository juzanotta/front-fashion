import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useAdminStore } from "./context/AdminContext"

const apiUrl = import.meta.env.VITE_API_URL

type Inputs = {
    id?: number
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

        type NovoProdutoPayload = Omit<Inputs, 'id'>

        const novoProduto: NovoProdutoPayload = {
            cor: data.cor,
            marca: data.marca,
            material: data.material,
            valor: Number(data.valor),
            foto: data.foto,
            tamanho: data.tamanho.toUpperCase(),
            tipo: data.tipo.toUpperCase(),
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
            const erro = await response.json()
            console.error(erro)
            toast.error("Erro no cadastro do Produto...")
        }
    }

    return (
        <div className="bg-[#F1EEE7] h-screen px-33 py-25  flex">

            <h1 className="font-serif text-[#C33941] text-5xl w-30 ">novo produto</h1>

            <form className="max-w-md mx-auto py-10" onSubmit={handleSubmit(incluirProduto)}>

                <div className="relative z-0 w-full mb-5 group">
                    <select
                        id="tipo"
                        defaultValue=""
                        required
                        {...register("tipo")}>
                        <option value="" disabled hidden></option>
                        <option value="CALCA" className="bg-[#D7A278] font-medium">Calça</option>
                        <option value="BLUSA" className="bg-[#D7A278] font-medium">Blusa</option>
                        <option value="ACESSORIO" className="bg-[#D7A278] font-medium">Acessório</option>
                        <option value="SAIA" className="bg-[#D7A278] font-medium">Saia</option>
                        <option value="VESTIDO" className="bg-[#D7A278] font-medium">Vestido</option>
                        <option value="BOLSA" className="bg-[#D7A278] font-medium">Bolsa</option>
                        <option value="CALCADO" className="bg-[#D7A278] font-medium">Sapato</option>
                    </select>

                    <label
                        htmlFor="tipo"
                        className="peer-focus:font-medium absolute text-sm text-[#C33941] dark:text-[#C33941] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#D7A278] peer-focus:dark:text-[#C33941] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Tipo da peça
                    </label>
                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <input type="text" id="cor" className="block py-2.5 px-0 w-full text-sm text-[#C33941] bg-transparent border-0 border-b-2 border-[#C33941] appearance-none dark:text-[#C33941] dark:border-[#C33941] dark:focus:border-[#D7A278] focus:outline-none focus:ring-0 focus:border-[#D7A278] peer font-medium" placeholder=" " required
                        {...register("cor")} />
                    <label htmlFor="" className="peer-focus:font-medium absolute text-sm text-[#C33941] dark:text-[#C33941] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#D7A278] peer-focus:dark:text-[#C33941] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Cor da peça</label>
                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <input type="text" id="marca" className="block py-2.5 px-0 w-full text-sm text-[#C33941] bg-transparent border-0 border-b-2 border-[#C33941] appearance-none dark:text-white dark:border-[#C33941] dark:focus:border-[#C33941] focus:outline-none focus:ring-0 focus:border-[#D7A278] peer font-medium" placeholder=" "
                        {...register("marca")}
                    />
                    <label htmlFor="marca" className="peer-focus:font-medium absolute text-sm text-[#C33941] dark:text-[#C33941] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#D7A278] peer-focus:dark:text-[#C33941] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Marca (Opcional)
                    </label>
                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <input type="text" id="material" className="block py-2.5 px-0 w-full text-sm text-[#C33941] bg-transparent border-0 border-b-2 border-[#C33941] appearance-none dark:text-white dark:border-[#C33941] dark:focus:border-[#C33941] focus:outline-none focus:ring-0 focus:border-[#D7A278] peer font-medium" placeholder=" "
                        {...register("material")}
                    />
                    <label htmlFor="material" className="peer-focus:font-medium absolute text-sm text-[#C33941] dark:text-[#C33941] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#D7A278] peer-focus:dark:text-[#C33941] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Material (Opcional)
                    </label>
                </div>

                <div className="grid md:grid-cols-2 md:gap-6">

                    <div className="relative z-0 w-full mb-5 group">
                        <select id="tamanho" defaultValue="" required className="block py-2.5 px-0 w-full text-sm text-[#C33941] bg-transparent border-0 border-b-2 border-[#C33941] appearance-none dark:text-white dark:border-[#C33941] dark:focus:border-[#C33941] focus:outline-none focus:ring-0 focus:border-[#D7A278] peer font-medium"
                            {...register("tamanho")}>
                            <option value="" disabled hidden></option>
                            <option value="PP" className="bg-[#D7A278] font-medium">PP</option>
                            <option value="P" className="bg-[#D7A278] font-medium">P</option>
                            <option value="M" className="bg-[#D7A278] font-medium">M</option>
                            <option value="G" className="bg-[#D7A278] font-medium">G</option>
                            <option value="G" className="bg-[#D7A278] font-medium">GG</option>
                            <option value="G1" className="bg-[#D7A278] font-medium">XG</option>
                        </select>
                        <label htmlFor="tamanho" className="peer-focus:font-medium absolute text-sm text-[#C33941] dark:text-[#C33941] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#D7A278] peer-focus:dark:text-[#C33941] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Tamanho</label>
                    </div>

                    <div className="relative z-0 w-full mb-5 group">
                        <input type="number" id="valor" className="block py-2.5 px-0 w-full text-sm text-[#C33941] bg-transparent border-0 border-b-2 border-[#C33941] appearance-none dark:text-white dark:border-[#C33941] dark:focus:border-[#C33941] focus:outline-none focus:ring-0 focus:border-[#D7A278] peer font-medium" placeholder=" " required
                            {...register("valor", { valueAsNumber: true })}
                        />
                        <label htmlFor="valor" className="peer-focus:font-medium absolute text-sm text-[#C33941] dark:text-[#C33941] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#D7A278] peer-focus:dark:text-[#C33941] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Valor</label>
                    </div>
                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <input type="text" id="foto" className="block py-2.5 px-0 w-full text-sm text-[#C33941] bg-transparent border-0 border-b-2 border-[#C33941] appearance-none dark:text-white dark:border-[#C33941] dark:focus:border-[#C33941] focus:outline-none focus:ring-0 focus:border-[#D7A278] peer font-medium" placeholder=" " required
                        {...register("foto")}
                    />
                    <label htmlFor="foto" className="peer-focus:font-medium absolute text-sm text-[#C33941] dark:text-[#C33941] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#D7A278] peer-focus:dark:text-[#C33941] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Foto (URL)</label>
                </div>

                <button type="submit" className="text-[#F1EEE7] bg-[#D7A278] hover:bg-[#C33941] hover:text-[#D7A278] border border-[#C33941] focus:ring-4 focus:outline-none focus:ring-[#D7A278] font-medium rounded-lg text-m w-full sm:w-auto px-7 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Enviar</button>
            </form>

            <div className="w-27"></div>


        </div>
    )
}