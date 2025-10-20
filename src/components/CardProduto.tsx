import { useState } from "react";
import type { ProdutoType } from "../utils/ProdutoType";

export function CardProduto({ data }: { data: ProdutoType }) {
  const storageKey = `favorito-${data.id}`;

  const [favoritado, setFavoritado] = useState(() => {
    const storedValue = localStorage.getItem(storageKey);
    return storedValue ? JSON.parse(storedValue) : false;
  });

  const toggleFavorito = () => {
    const novoStatus = !favoritado;

    setFavoritado(novoStatus);

    localStorage.setItem(storageKey, JSON.stringify(novoStatus));
  };

  let tipoDisplay = data.tipo;
  if (data.tipo === "CALCADO") {
    tipoDisplay = "calçado";
  }
  if (data.tipo === "CALCA") {
    tipoDisplay = "calça";
  }

  return (
    <div className="card bg-[#F1EEE7] border border-[#C33941] w-75 shadow-[#C33941]">
      <figure className="px-5 pt-5">
        <img
          src={data.foto}
          alt="foto"
          className="rounded-xl w-full h-75 object-cover"
        />
      </figure>

      <div className="px-7 p-4 start">
        <h2 className="card-title font-sans font-bold text-xl text-[#C33941] lowercase">
          {tipoDisplay} {data.cor}
        </h2>

        <p className="font-sans text-[#C33941] text-medium">
          {data.tamanho} | R$
          {Number(data.valor).toLocaleString("pt-br", {
            minimumFractionDigits: 2,
          })}
        </p>

        <div className="card-actions flex justify-end items-center">
          <div className="mt-auto">
            {data.marca && (
              <div className="badge badge-outline mr-2 text-[#C33941] pb-1">
                {data.marca}
              </div>
            )}
            {data.material && (
              <div className="badge badge-outline text-[#C33941] pb-1">
                {data.material}
              </div>
            )}
          </div>

          <div
            className="btn btn-circle bg-[#F1EEE7] border-[#F1EEE7] text-[#C33941] mt-4"
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
          </div>
        </div>
      </div>
    </div>
  );
}