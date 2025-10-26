import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import Titulo from "./components/Titulo";
import { useClienteStore } from "./context/ClienteContext";

type Inputs = {
    nome: string;
    email: string;
    endereco: string;
    telefone: string;
    cidade: string;
    senha: string;
    senha2: string;
};

const apiUrl = import.meta.env.VITE_API_URL;

export default function CadCliente() {
    const { register, handleSubmit } = useForm<Inputs>();
    const navigate = useNavigate();
    const { logaCliente } = useClienteStore();

    async function cadastraCliente(data: Inputs) {
        if (data.senha != data.senha2) {
            toast.error("Erro... Senha e Confirme Senha precisam ser iguais");
            return;
        }

        try {
            const responseCad = await fetch(`${apiUrl}/clientes`, {
                headers: { "Content-Type": "application/json" },
                method: "POST",
                body: JSON.stringify({
                    nome: data.nome,
                    cidade: data.cidade,
                    endereco: data.endereco,
                    telefone: data.telefone,
                    email: data.email,
                    senha: data.senha,
                }),
            });

            if (responseCad.status === 201) {
                const responseLogin = await fetch(`${apiUrl}/login`, {
                    headers: { "Content-Type": "application/json" },
                    method: "POST",
                    body: JSON.stringify({
                        email: data.email,
                        senha: data.senha,
                    }),
                });

                if (responseLogin.ok) {
                    const loginData = await responseLogin.json();
                    logaCliente(loginData);

                    toast.success(`Bem-vindo(a), ${loginData.nome}!`);
                    setTimeout(() => {
                        navigate("/");
                    }, 1500);

                } else {
                    toast.success("Cadastro realizado com sucesso!");
                    setTimeout(() => {
                        navigate("/login");
                    }, 1500);
                }

            } else {
                const erroData = await responseCad.json();

                let mensagemErro = "Erro... Não foi possível realizar o cadastro";

                if (erroData.erro && typeof erroData.erro === 'string') {
                    mensagemErro = erroData.erro;
                } else if (erroData.erro && erroData.erro.issues) {
                    mensagemErro = erroData.erro.issues.map((e: any) => e.message).join('; ');
                }

                toast.error(mensagemErro);
            }
        } catch (error) {
            toast.error("Erro... Usuário não foi cadastrado!");
            console.error("Erro ao cadastrar:", error);
        }
    }

    return (
        <>
            <Titulo />
            <section className="bg-[#F1EEE7] dark:bg-gray-900 py-20 px-4">
                <div className="w-full rounded-lg sm:max-w-md dark:bg-gray-800 dark:border dark:border-gray-700 mx-auto">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="font-serif text-[#C33941] text-5xl">
                            cadastre-se
                        </h1>
                        <form
                            className="space-y-4 md:space-y-6"
                            onSubmit={handleSubmit(cadastraCliente)}
                        >
                            <div>
                                <label
                                    htmlFor="nome"
                                    className="block mb-2 text-sm font-medium text-[#C33941] dark:text-white pl-2"
                                >
                                    nome
                                </label>
                                <input
                                    type="text"
                                    id="nome"
                                    className="bg-[#F1EEE7] border border-[#C33941] text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="seu nome completo"
                                    required
                                    {...register("nome")}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-[#C33941] dark:text-white pl-2"
                                >
                                    e-mail
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="bg-[#F1EEE7] border border-[#C33941] text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="nome@gmail.com"
                                    required
                                    {...register("email")}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="telefone"
                                    className="block mb-2 text-sm font-medium text-[#C33941] dark:text-white pl-2"
                                >
                                    telefone
                                </label>
                                <input
                                    type="text"
                                    id="telefone"
                                    className="bg-[#F1EEE7] border border-[#C33941] text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="seu telefone"
                                    required
                                    {...register("telefone")}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="cidade"
                                    className="block mb-2 text-sm font-medium text-[#C33941] dark:text-white pl-2"
                                >
                                    cidade
                                </label>
                                <input
                                    type="text"
                                    id="cidade"
                                    className="bg-[#F1EEE7] border border-[#C33941] text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="sua cidade"
                                    required
                                    {...register("cidade")}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="endereco"
                                    className="block mb-2 text-sm font-medium text-[#C33941] dark:text-white pl-2"
                                >
                                    endereço
                                </label>
                                <input
                                    type="text"
                                    id="endereco"
                                    className="bg-[#F1EEE7] border border-[#C33941] text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="seu endereço"
                                    required
                                    {...register("endereco")}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-[#C33941] dark:text-white pl-2"
                                >
                                    senha
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="bg-[#F1EEE7] border border-[#C33941] text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                    {...register("senha")}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="confirm-password"
                                    className="block mb-2 text-sm font-medium text-[#C33941] dark:text-white pl-2"
                                >
                                    confirme a senha
                                </label>
                                <input
                                    type="password"
                                    id="confirm-password"
                                    placeholder="••••••••"
                                    className="bg-[#F1EEE7] border border-[#C33941] text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                    {...register("senha2")}
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full text-[#F1EEE7] bg-[#C33941] hover:bg-[#F1EEE7] hover:text-[#C33941] border border-[#C33941] focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
                            >
                                crie sua conta!
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                já tem uma conta?{" "}
                                <Link
                                    to="/login"
                                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                >
                                    faça login!
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </section>
            <Toaster richColors position="top-right" />
        </>
    );
}
