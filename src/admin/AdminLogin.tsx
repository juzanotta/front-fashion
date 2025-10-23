import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useAdminStore } from "./context/AdminContext"

import { useNavigate } from "react-router-dom"

const apiUrl = import.meta.env.VITE_API_URL

type Inputs = {
  email: string
  senha: string
}

export default function AdminLogin() {
  const { register, handleSubmit, setFocus } = useForm<Inputs>()
  const navigate = useNavigate()
  const { logaAdmin } = useAdminStore()

  useEffect(() => {
    setFocus("email")
  }, [])

  async function verificaLogin(data: Inputs) {
    const response = await fetch(`${apiUrl}/admins/login`, {
      method: "POST",
      headers: { "Content-type": "Application/json" },
      body: JSON.stringify({ email: data.email, senha: data.senha })
    })

    if (response.status == 200) {
      const admin = await response.json()
      logaAdmin(admin)
      navigate("/admin", { replace: true })
    } else if (response.status == 400) {
      toast.error("Erro... Login ou senha incorretos")
    }
  }

  return (
    <>
      <section className="bg-[#C33941] dark:bg-[#F1EEE7]">
        <p style={{ height: 110 }}></p>
        <div className="flex flex-col items-center md:h-screen">
          <div className="w-full flex flex-col items- rounded-lg  dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="font-serif text-[#F1EEE7] text-5xl">
                log in - admin
              </h1>
              <form className="space-y-4 md:space-y-6"
                onSubmit={handleSubmit(verificaLogin)} >
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-[#F1EEE7] dark:text-white pl-2">e-mail</label>
                  <input type="email" id="email"
                    className="bg-[#C33941] border border-[#F1EEE7] text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    {...register("email")} />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-[#F1EEE7]  dark:text-white pl-2">senha</label>
                  <input type="password" id="password"
                    className="bg-[#C33941] border border-[#F1EEE7] text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    {...register("senha")} />
                </div>
                
                <button type="submit" className="w-full text-[#C33941] bg-[#F1EEE7] hover:bg-[#C33941] hover:text-[#F1EEE7] border border-[#F1EEE7] focus:ring-4 focus:outline-none focus:ring-[#C33941] font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer">
                  entrar
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
