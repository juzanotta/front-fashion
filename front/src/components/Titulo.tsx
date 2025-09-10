import type { ProdutoType } from "../utils/ProdutoType";
import { InputPesquisa } from "./InputPesquisa";
import { Link } from "react-router-dom";

type TituloProps = {
    setProdutos: React.Dispatch<React.SetStateAction<ProdutoType[]>>;
};

export default function Titulo({ setProdutos }: TituloProps) {
    return (
        <>
            <div className="navbar shadow-sm px-30 bg-[#E3D5B8] fixed top-0 left-0 w-full h-16 z-50">

                <div className="navbar-start">
                    <a href="#categorias" className="font-sans font-normal text-sm lowercase tracking-wider px-3 text-[#C33941] hover:underline">Categorias</a>
                    <Link to="/inclusao" className="font-sans font-normal text-sm lowercase tracking-wider px-3 text-[#C33941] hover:underline">Incluir</Link>
                    <Link to="/listagem" className="font-sans font-normal text-sm lowercase tracking-wider px-3 text-[#C33941] hover:underline">produtos</Link>
                </div>

                <div className="navbar-center">
                    <Link to="/" className="text-2xl uppercase font-medium tracking-wider text-[#C33941] font-serif hover:font-bold" >Avenida</Link>
                </div>
                <div className="flex navbar-end gap-2">
                    <InputPesquisa setProdutos={setProdutos} />

                    <div className="dropdown dropdown-end">
                        <Link to="/favoritos" className="btn btn-circle bg-[#E3D5B8] border-[#E3D5B8] text-[#C33941] hover:bg-[#C33941] hover:text-[#E3D5B8] mb-1 ml-4">
                            <div className="indicator">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                </svg>

                            </div>
                        </Link>

                        <div tabIndex={0} role="button" className="btn btn-circle bg-[#E3D5B8] border-[#E3D5B8] text-[#C33941] hover:bg-[#C33941] hover:text-[#E3D5B8] mx-2 mb-1">
                            <div className="indicator">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                </svg>
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-30 p-2 shadow font-sans">
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="">Logout</Link></li>
                        </ul>
                        </div>
                    </div>
                </div>
        </>
    )
}