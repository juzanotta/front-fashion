// import Section3 from "./Section3";
import { CardProduto } from "./components/CardProduto";
import type { ProdutoType } from "./utils/ProdutoType";
import { useEffect, useState, useRef, createContext, useContext } from "react";
import Titulo from "./components/Titulo";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL

const ClienteContext = createContext({
  logaCliente: (dados: any) => {},
});

const useClienteStore = () => useContext(ClienteContext);

export default function App() {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState<ProdutoType[]>([])
  const { logaCliente } = useClienteStore();

  function handleTipoClick(tipo: string) {
    navigate(`/produtos?tipo=${tipo}`);
  }

  useEffect(() => {
    async function buscaDados() {
      try {
        const response = await fetch(`${apiUrl}/produtos`);
        const dados = await response.json();
        setProdutos(dados.slice(-6));
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    }
    buscaDados();

    async function buscaCliente(id: string) {
      try {
        const response = await fetch(`${apiUrl}/clientes/${id}`);
        const dados = await response.json();
        logaCliente(dados);
      } catch (error) {
        console.error("Erro ao buscar cliente:", error);
      }
    }
    if (localStorage.getItem("clienteKey")) {
      const idCliente = localStorage.getItem("clienteKey");
      if (idCliente) {
        buscaCliente(idCliente);
      }
    }
  }, [logaCliente]);

  const listaProdutos = produtos.map(produto => (
    <CardProduto data={produto} key={produto.id} />
  ));

  const carrossel = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (carrossel.current) {
      carrossel.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carrossel.current) {
      carrossel.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <ClienteContext.Provider value={{ logaCliente: () => {} }}>
      <Titulo setProdutos={setProdutos} />

      <section className="bg-[#C33941] h-140 px-50 pt-15 flex flex-col justify-center items-center">
        <img src="/avenida.png" alt="Avenida" className="w-50 " />
        <img src="/fashion.png" alt="Fashion" className="w-150 " />
      </section>

      <section
        id="tipos"
        className="h-145 w-full bg-[url('/background2.png')] bg-cover bg-center px-30 py-10"
      >
        <h1 className="font-serif uppercase text-3xl text-[#C33941] flex justify-center pb-3">
          tipos
        </h1>

        <div className="relative">
          <div
            ref={carrossel}
            className="carousel carousel-center rounded-box max-w space-x-4 p-4 overflow-x-scroll scroll-smooth"
          >
            <div className="carousel-item flex flex-col items-center cursor-pointer"
              onClick={() => handleTipoClick("CALCA")}>
              <img src="/pants.jpg" className="rounded-box h-80 object-cover" alt="Calças"/>
              <p className="font-serif lowercase text-[#C33941] text-xl font-medium pt-2">
                calças
              </p>
            </div>

            <div className="carousel-item flex flex-col items-center cursor-pointer"
              onClick={() => handleTipoClick("BLUSA")}>
              <img src="/blouse.jpg" className="rounded-box h-80 object-cover" alt="Blusas" />
              <p className="font-serif lowercase text-[#C33941] text-xl font-medium pt-2">
                blusas
              </p>
            </div>

            <div className="carousel-item flex flex-col items-center cursor-pointer"
              onClick={() => handleTipoClick("VESTIDO")}>
              <img src="/dress.jpg" className="rounded-box h-80 object-cover" alt="Vestidos" />
              <p className="font-serif lowercase text-[#C33941] text-xl font-medium pt-2">
                vestidos
              </p>
            </div>

            <div className="carousel-item flex flex-col items-center cursor-pointer"
              onClick={() => handleTipoClick("BOLSA")}>
              <img src="/purse.jpg" className="rounded-box h-80 object-cover" alt="Bolsas"/>
              <p className="font-serif lowercase text-[#C33941] text-xl font-medium pt-2">
                bolsas
              </p>
            </div>

            <div className="carousel-item flex flex-col items-center cursor-pointer"
              onClick={() => handleTipoClick("SAIA")}>
              <img src="/skirt.jpg" className="rounded-box h-80 object-cover" alt="Saias"/>
              <p className="font-serif lowercase text-[#C33941] text-xl font-medium pt-2">
                saias
              </p>
            </div>

            <div className="carousel-item flex flex-col items-center cursor-pointer"
              onClick={() => handleTipoClick("CALCADO")}>
              <img src="/shoes.jpg" className="rounded-box h-80 object-cover" alt="Sapatos"/>
              <p className="font-serif lowercase text-[#C33941] text-xl font-medium pt-2">
                sapatos
              </p>
            </div>
          </div>

          <button
            onClick={scrollLeft}
            className="absolute right-265 top-40 btn btn-circle btn-ghost text-[#C33941]"
          >
            ❮
          </button>
          <button
            onClick={scrollRight}
            className="absolute right-reverse-10 top-40 btn btn-circle btn-ghost text-[#C33941]"
          >
            ❯
          </button>
        </div>
      </section>

      <div className="bg-[#FFFFE7] h-full px-33 py-23 ">
        <h1 className="font-serif text-[#C33941] text-6xl w-30 flex justify-end">new in</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
          {listaProdutos}
        </div>
      </div>
    </ClienteContext.Provider>
  );
}