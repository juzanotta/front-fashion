// import Section3 from "./Section3";
import { CardProduto } from "./components/CardProduto";
import { InputPesquisa } from "./components/InputPesquisa";
import type { ProdutoType } from "./utils/ProdutoType";
import { useEffect, useState, useRef } from "react";
import { useClienteStore } from "./context/ClienteContext"

const apiUrl = import.meta.env.VITE_API_URL

export default function App() {
  const [produtos, setProdutos] = useState<ProdutoType[]>([])
  const { logaCliente } = useClienteStore()

  useEffect(() => {
    async function buscaDados() {
      const response = await fetch(`${apiUrl}/produtos`)
      const dados = await response.json()
      //      console.log(dados)
      setProdutos(dados)
    }
    buscaDados()

    async function buscaCliente(id: string) {
      const response = await fetch(`${apiUrl}/clientes/${id}`)
      const dados = await response.json()
      logaCliente(dados)
    }
    if (localStorage.getItem("clienteKey")) {
      const idCliente = localStorage.getItem("clienteKey")
      buscaCliente(idCliente as string)
    }
  }, [])

  const listaProdutos = produtos.map(produto => (
    <CardProduto data={produto} key={produto.id} />
  ))

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
    <>
      {/* Banner inicial */}
      <section className="bg-[#C33941] h-140 px-50 pt-15 flex flex-col justify-center items-center">
        <img src="./avenida.png" alt="" className="w-50 " />
        <img src="./fashion.png" alt="" className="w-150 " />
      </section>

      {/* Carrossel de categorias */}
      <section
        id="categorias"
        className="h-145 w-full bg-[url('/background2.png')] bg-cover bg-center px-30 py-10"
      >
        <h1 className="font-serif uppercase text-3xl text-[#C33941] flex justify-center pb-3">
          categorias
        </h1>

        <div className="relative">
          <div
            ref={carrossel}
            className="carousel carousel-center rounded-box max-w space-x-4 p-4 overflow-x-scroll scroll-smooth"
          >
            <div className="carousel-item flex flex-col items-center">
              <img src="./pants.jpg" className="rounded-box h-80 object-cover" />
              <p className="font-serif lowercase text-[#C33941] text-xl font-medium pt-2">
                calças
              </p>
            </div>

            <div className="carousel-item flex flex-col items-center">
              <img src="./blouse.jpg" className="rounded-box h-80 object-cover" />
              <p className="font-serif lowercase text-[#C33941] text-xl font-medium pt-2">
                blusas
              </p>
            </div>

            <div className="carousel-item flex flex-col items-center">
              <img src="./dress.jpg" className="rounded-box h-80 object-cover" />
              <p className="font-serif lowercase text-[#C33941] text-xl font-medium pt-2">
                vestidos
              </p>
            </div>

            <div className="carousel-item flex flex-col items-center">
              <img src="./purse.jpg" className="rounded-box h-80 object-cover" />
              <p className="font-serif lowercase text-[#C33941] text-xl font-medium pt-2">
                bolsas
              </p>
            </div>

            <div className="carousel-item flex flex-col items-center">
              <img src="./skirt.jpg" className="rounded-box h-80 object-cover" />
              <p className="font-serif lowercase text-[#C33941] text-xl font-medium pt-2">
                saias
              </p>
            </div>

            <div className="carousel-item flex flex-col items-center">
              <img src="./shoes.jpg" className="rounded-box h-80 object-cover" />
              <p className="font-serif lowercase text-[#C33941] text-xl font-medium pt-2">
                sapatos
              </p>
            </div>
          </div>

          {/* Botões */}
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

      {/* Próxima seção */}
      {/* <Section3 /> */}
      <InputPesquisa setProdutos={setProdutos} />
      <div className="max-w-7xl mx-auto">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Veículos <span className="underline underline-offset-3 decoration-8 decoration-orange-400 dark:decoration-orange-600">em destaque</span>
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {listaProdutos}
        </div>
      </div>
    </>
  );
}