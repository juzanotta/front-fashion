import { CardProduto } from "./components/CardProduto";
import type { ProdutoType } from "./utils/ProdutoType";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useClienteStore } from "./context/ClienteContext";

const apiUrl = import.meta.env.VITE_API_URL;

const tiposDeProduto = [
  { label: "calças", imagem: "/pants.jpg", tipo: "CALCA" },
  { label: "blusas", imagem: "/blouse.jpg", tipo: "BLUSA" },
  { label: "vestidos", imagem: "/dress.jpg", tipo: "VESTIDO" },
  { label: "bolsas", imagem: "/purse.jpg", tipo: "BOLSA" },
  { label: "saias", imagem: "/skirt.jpg", tipo: "SAIA" },
  { label: "sapatos", imagem: "/shoes.jpg", tipo: "CALCADO" },
];

export default function App() {
  const [produtos, setProdutos] = useState<ProdutoType[]>([]);
  const { logaCliente } = useClienteStore();
  const navigate = useNavigate();
  const produtossel = useRef<HTMLDivElement>(null);

  function handleTipoClick(tipo: string) {
    navigate(`/produtos?tipo=${tipo}`);
  }

  useEffect(() => {
    async function buscaDados() {
      try {
        const response = await fetch(`${apiUrl}/produtos`);
        const dados = await response.json();
        setProdutos(dados.slice(0, 8));
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
      if (idCliente) {
        buscaCliente(idCliente as string);
      }
    }
  }, []);

  const listaProdutos = produtos.map((produto) => (
    <CardProduto data={produto} key={produto.id} />
  ));

  const scrollLeft = () => {
    if (produtossel.current) {
      produtossel.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (produtossel.current) {
      produtossel.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <>

      <section className="bg-[#C33941] h-140 px-50 pt-15 flex flex-col justify-center items-center">
        <img src="/avenida.png" alt="Avenida" className="w-50" />
        <img src="/fashion.png" alt="Fashion" className="w-150" />
      </section>

      <section
        id="tipos"
        className="w-full bg-[url('/background2.png')] bg-cover bg-center py-10"
      >
        <h1 className="font-serif uppercase text-3xl text-[#C33941] flex justify-center pb-3">
          tipos
        </h1>

        <div className="flex items-center justify-center max-w-6xl mx-auto px-4">

          <button
            onClick={scrollLeft}
            className="flex-shrink-0 p-2 rounded-full bg-none cursor-pointer hover:bg-white/80 transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#C33941" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>

          <div className="flex-1 overflow-hidden mx-4">
            <div
              ref={produtossel}
              className="flex items-center space-x-4 overflow-x-auto scroll-smooth no-scrollbar"
            >
              {tiposDeProduto.map((item) => (
                <div
                  key={item.tipo}
                  className="flex-none flex flex-col items-center cursor-pointer"
                  onClick={() => handleTipoClick(item.tipo)}
                >
                  <img src={item.imagem} className="rounded-box h-80 w-60 object-cover" alt={item.label} />
                  <p className="font-serif lowercase text-[#C33941] text-xl font-medium pt-2">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={scrollRight}
            className="flex-shrink-0 p-2 rounded-full bg-none cursor-pointer hover:bg-white/80 transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#C33941" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </section>

      <section className="bg-[#F1EEE7] h-full px-25 py-23">
        <h1 className="font-serif text-[#C33941] text-6xl w-30 flex justify-end">new in</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-11 place-items-center mt-8">
          {listaProdutos}
        </div>
      </section>
    </>
  );
}