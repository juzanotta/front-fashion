import { useAdminStore } from "../context/AdminContext"
import { IoExitOutline } from "react-icons/io5"
import { BiSolidDashboard } from "react-icons/bi"
import { FaUsers } from "react-icons/fa6"
import { AiTwotoneSkin, AiTwotoneShopping } from "react-icons/ai";

import { Link, useNavigate } from "react-router-dom"

export function MenuLateral() {
  const navigate = useNavigate()
  const { deslogaAdmin } = useAdminStore()

  function adminSair() {
    if (confirm("Confirma Saída?")) {
      deslogaAdmin()
      navigate("/", { replace: true })
    }
  }

  return (
    <aside id="default-sidebar" className="fixed mt-16 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
      <div className="h-full px-3 py-15 overflow-y-auto bg-[#C33941] dark:bg-gray-800">
        <ul className="space-y-2">
        <li>
            <Link to="/admin" className="flex items-center p-2">
              <span className="h-5 text-[#F1EEE7] text-xl ">
                <BiSolidDashboard />
              </span>
              <span className="font-sans text-[#F1EEE7] text-medium pl-2 font-normal">visão geral</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/produtos" className="flex items-center p-2">
              <span className="h-5 text-[#F1EEE7] text-xl ">
                <AiTwotoneSkin />
              </span>
              <span className="font-sans text-[#F1EEE7] text-medium pl-2 font-normal">incluir produto</span>
            </Link>
          </li>
          <li>
          <Link to="/admin/clientes" className="flex items-center p-2">
              <span className="h-5 text-[#F1EEE7] text-xl ">
                <FaUsers />
              </span>
              <span className="font-sans text-[#F1EEE7] text-medium pl-2 font-normal">controle de clientes</span>
            </Link>
          </li>
          <li>
          <Link to="/admin/vendas" className="flex items-center p-2 cursor-pointer">
              <span className="h-5 text-[#F1EEE7] text-xl ">
                <AiTwotoneShopping />
              </span>
              <span className="font-sans text-[#F1EEE7] text-medium pl-2 font-normal">controle de vendas</span>
            </Link>
          </li>

          <li>
            <span className="flex items-center p-2 cursor-pointer">
              <span className="h-5 text-[#F1EEE7] text-xl ">
                <IoExitOutline />
              </span>
              <span className="font-sans text-[#F1EEE7] text-medium pl-2 font-normal" onClick={adminSair}>sair do sistema</span>
            </span>
          </li>
        </ul>
      </div>
    </aside>
  )
}