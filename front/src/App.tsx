import Section3 from "./Section3";
import { useRef } from "react";

function App() {
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
      <Section3 />
    </>
  );
}

export default App;
