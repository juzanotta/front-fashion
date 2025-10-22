import { useState } from "react";
import type { ProdutoType } from "../utils/ProdutoType";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { useClienteStore } from "../context/ClienteContext";

export function CardProduto({ data }: { data: ProdutoType }) {
    const navigate = useNavigate();
    const { cliente } = useClienteStore();
    const storageKey = `favorito-${data.id}`;

    const [favoritado, setFavoritado] = useState(() => {
        const storedValue = localStorage.getItem(storageKey);
        return storedValue ? JSON.parse(storedValue) : false;
    });

    const toggleFavorito = () => {
        const novoStatus = !favoritado;

        if (!cliente.token) {
            toast.error("Você precisa estar logado para favoritar!");
            setTimeout(() => {
                navigate("/login")
            }, 2000)
            return;
        }

        setFavoritado(novoStatus);

        localStorage.setItem(storageKey, JSON.stringify(novoStatus));
    };

    let tipoExibicao = data.tipo.toLowerCase();
    if (data.tipo === "CALCA") {
        tipoExibicao = "calça";
    } else if (data.tipo === "CALCADO") {
        tipoExibicao = "calçado";
    }

    function handleComprar() {
        if (!cliente.token) {
            toast.error("Você precisa estar logado para comprar!");
            setTimeout(() => {
                navigate("/login")
            }, 2000)
            return;
        }

        navigate(`/comprar/${data.id}`);
    }

    return (
        <div className="card bg-[#F1EEE7] border border-[#C33941] w-75">
            <figure className="px-3 pt-3">
                <img
                    src={data.foto}
                    alt={tipoExibicao}
                    className="rounded-lg w-full h-72 object-cover"
                />
            </figure>

            <div className="card-body p-5">
                <h2 className="card-title font-sans font-bold text-xl text-[#C33941]">{tipoExibicao} {data.cor}</h2>

                <p className="font-sans text-[#C33941] text-lg">{data.tamanho} | R${Number(data.valor).toLocaleString("pt-br", { minimumFractionDigits: 2 })}</p>

                <div className="mt-2">
                    {data.marca && (
                        <div className="badge badge-outline mr-2 text-[#C33941] py-3">
                            {data.marca}
                        </div>
                    )}
                    {data.material && (
                        <div className="badge badge-outline text-[#C33941] py-3">
                            {data.material}
                        </div>
                    )}
                </div>
                <div className="card-actions justify-between items-center mt-4">
                    <button
                        className="btn bg-[#C33941] text-[#F1EEE7] hover:bg-[#a52e35] w-30 border-[#C33941] rounded-lg"
                        onClick={handleComprar}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>
                        comprar
                    </button>

                    <button
                        className="btn btn-circle bg-transparent border-[#C33941] text-[#C33941] hover:bg-[#C33941] hover:text-[#F1EEE7]"
                        onClick={toggleFavorito}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill={favoritado ? "currentColor" : "none"}
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            <Toaster richColors position="top-right" />
        </div>
    )
}