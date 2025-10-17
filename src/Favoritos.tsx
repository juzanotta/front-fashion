import { useEffect, useState } from "react";
import Titulo from "./components/Titulo";
import type { ProdutoType } from "./utils/ProdutoType";
import { useSearchParams } from "react-router";
import { useClienteStore } from "./context/ClienteContext";
import { InputPesquisa } from "./components/InputPesquisa";
import { CardProduto } from "./components/CardProduto";

const apiUrl = import.meta.env.VITE_API_URL

export default function Favoritos() {
    const [produtos, setProdutos] = useState<ProdutoType[]>([]);
    const { logaCliente } = useClienteStore();
    const [searchParams] = useSearchParams();


    useEffect(() => {
        async function buscaDados() {
            try {
                const response = await fetch(`${apiUrl}/produtos`);
                let dados = await response.json();

                if (Array.isArray(dados)) {
                    const produtosFavoritos = dados.filter(
                        (produto) => produto.favorito === true
                    )
                    setProdutos(produtosFavoritos)
                }

                setProdutos(dados);
            } catch (error) {
                console.error("Erro ao buscar produtos:", error);
            }
        }
        buscaDados();

        async function buscaCliente(id: string) {
            const response = await fetch(`${apiUrl}/clientes/${id}`);
            const dados = await response.json();
            logaCliente(dados);
        }
        if (localStorage.getItem("clienteKey")) {
            const idCliente = localStorage.getItem("clienteKey");
            buscaCliente(idCliente as string);
        }
    }, [logaCliente]);

    return (
        <>
            <Titulo setProdutos={setProdutos} />
            <div className="bg-[#F1EEE7] h-full px-33 py-23 ">
                        <div className="flex justify-between pb-9 items-center">
                            <h1 className="font-serif text-[#C33941] text-5xl w-30">favoritos</h1>
                            <InputPesquisa setProdutos={setProdutos} />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
                            {produtos.length > 0 ? (
                                produtos.map(produto => (
                                    <CardProduto data={produto} key={produto.id} />
                                ))
                            ) : (
                                <p className="text-gray-600">Nenhum produto encontrado.</p>
                            )}
                        </div>
                    </div>
        </>
    )
}