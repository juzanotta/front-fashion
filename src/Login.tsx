import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner"
import { useClienteStore } from "./context/ClienteContext"

type Inputs = {
    email: string
    senha: string
    manter: boolean
}

const apiUrl = import.meta.env.VITE_API_URL


export default function Login() {
    const { register, handleSubmit } = useForm<Inputs>()
    const { logaCliente } = useClienteStore()

    const navigate = useNavigate()

    async function verificaLogin(data: Inputs) {
        const response= await 
        fetch(`${apiUrl}/clientes/login`, {
            headers: {"Content-Type": "application/json"},
            method: "POST",
            body: JSON.stringify({ email: data.email, senha: data.senha })
        })

        if (response.status == 200) {
            toast.success("Ok!")
            const dados = await response.json()
            logaCliente(dados)
            if (data.manter) {
                localStorage.setItem("clienteKey", dados.id)
            } else {
                if (localStorage.getItem("clienteKey")) {
                    localStorage.removeItem("clienteKey")
                }
            }

            navigate("/")
        } else {
            toast.error("Login ou senha incorretos")
        }
    }

    return (
        <>
        <section className="bg-[#F1EEE7] dark:bg-[#C33941]">
            <p style={{ height: 110 }}></p>
            <div className="flex flex-col items-center md:h-screen">
                <div className="w-full flex flex-col items- rounded-lg  dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="font-serif text-[#C33941] text-5xl">
                            log in
                        </h1>
                        <form className="space-y-4 md:space-y-6" 
                           onSubmit={handleSubmit(verificaLogin)} >
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-[#C33941] dark:text-white pl-2">e-mail</label>
                                <input type="email" id="email" 
                                       className="bg-[#F1EEE7] border border-[#C33941] text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                       required 
                                       {...register("email")} />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-[#C33941]  dark:text-white pl-2">senha</label>
                                <input type="password" id="password" 
                                       className="bg-[#F1EEE7] border border-[#C33941] text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                       required 
                                       {...register("senha")} />
                            </div>
                            <div className="flex items-center justify-between pl-2">
                                <div className="flex items-start ">
                                    <div className="flex items-center h-5">
                                        <input id="remember" 
                                               aria-describedby="remember" type="checkbox" 
                                               className="w-4 h-4 border border-[#C33941] rounded bg-[#F1EEE7] focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800 cursor-pointer" 
                                               {...register("manter")} />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">manter conectada :)</label>
                                    </div>
                                </div>
                                <a href="#" className="text-sm font-medium text-[#C33941] hover:underline dark:text-primary-500">esqueceu sua senha? :(</a>
                            </div>
                            <button type="submit" className="w-full text-[#F1EEE7] bg-[#C33941] hover:bg-[#F1EEE7] hover:text-[#C33941] border border-[#C33941] focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer">
                                entrar
                            </button>
                            <Link to="/cadCliente" className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Ainda não possui conta? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Cadastre-se</a>
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}