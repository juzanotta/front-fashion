import { useEffect, useState } from "react";
import Titulo from "./components/Titulo";
import type { ProdutoType } from "./utils/ProdutoType";
import { useClienteStore } from "./context/ClienteContext";
import { InputPesquisa } from "./components/InputPesquisa";
import { CardProduto } from "./components/CardProduto";
import { Link } from "react-router-dom";


const apiUrl = import.meta.env.VITE_API_URL;

export default function Favoritos() {
  const [produtos, setProdutos] = useState<ProdutoType[]>([]);
  const { cliente } = useClienteStore();

  useEffect(() => {
    if (!cliente.token) {
      setProdutos([]);
      return;
    }

    async function buscaDados() {
      try {
        const response = await fetch(`${apiUrl}/produtos`);
        let dados = await response.json();

        if (Array.isArray(dados)) {
          const produtosFavoritos = dados.filter(
            (produto: ProdutoType) => {
              const storageKey = `favorito-${cliente.id}-${produto.id}`;
              const storedValue = localStorage.getItem(storageKey);
              return storedValue ? JSON.parse(storedValue) : false;
            }
          );
          setProdutos(produtosFavoritos);
        } else {
          setProdutos([]);
        }

      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    }
    buscaDados();
  }, [cliente.token]);

  const renderContent = () => {
    if (!cliente.token) {
      return (
        <p className="col-span-full text-center text-gray-600">
          Você precisa fazer <Link to="/login" className="underline text-[#C33941]">login</Link> para ver seus favoritos.
        </p>
      );
    }

    if (produtos.length === 0) {
      return (
        <p className="col-span-full text-center text-gray-600">
          Você ainda não favoritou nenhum produto.
        </p>
      );
    }

    return produtos.map((produto) => (
      <CardProduto data={produto} key={produto.id} />
    ));
  };

  return (
    <>
      <Titulo />
      <div className="bg-[#F1EEE7] min-h-screen px-4 md:px-33 py-23 pt-24"> {/* Ajustado o padding para mobile */}
        <div className="flex flex-col md:flex-row justify-between pb-9 items-center max-w-6xl mx-auto"> {/* Max-width para consistência */}
          <h1 className="font-serif text-[#C33941] text-5xl w-auto mb-4 md:mb-0"> {/* Ajustado 'w-30' */}
            favoritos
          </h1>
          {cliente.token && <InputPesquisa setProdutos={setProdutos} />}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-11 place-items-center mt-8 max-w-6xl mx-auto">
          {renderContent()}
        </div>
      </div>
    </>
  );
}