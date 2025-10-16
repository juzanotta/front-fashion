import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { ProdutoType } from "../utils/ProdutoType";

const apiUrl = import.meta.env.VITE_API_URL;

type Inputs = {
    termo: string;
};

type InputPesquisaProps = {
    setProdutos: React.Dispatch<React.SetStateAction<ProdutoType[]>>;
};

export function InputPesquisa({ setProdutos }: InputPesquisaProps) {
    const { register, handleSubmit, reset } = useForm<Inputs>();

    async function enviaPesquisa(data: Inputs) {
        if (data.termo.trim().length < 2) {
            toast.error("Informe, no mínimo, 2 caracteres");
            return;
        }

    try {
        const response = await fetch(`${apiUrl}/produtos/pesquisa/${data.termo}`);
        if (!response.ok) throw new Error("Erro ao buscar produtos");

        const dados = await response.json();
        setProdutos(dados);
        reset({ termo: "" });
    } catch (error) {
        toast.error("Não foi possível realizar a pesquisa");
        console.error(error);
    }
}

return (
    <form onSubmit={handleSubmit(enviaPesquisa)} className="relative">
        <svg
            className="absolute left-3 top-4 transform -translate-y-1/2 w-5 h-5 text-[#C33941]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#C33941"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
            />
        </svg>

        <input
            type="search"
            placeholder="Pesquisar"
            {...register("termo")}
            className="pl-10 pr-4 h-8 w-64 border rounded-full border-[#C33941] font-sans text-sm text-[#C33941] placeholder:text[#C33941] focus:ring-[#C33941] focus:border-[#C33941]"
        />
    </form>
);
}
