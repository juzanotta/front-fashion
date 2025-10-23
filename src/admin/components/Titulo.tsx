import { FiUsers } from "react-icons/fi"
import { Link } from "react-router-dom"
import { useAdminStore } from "../context/AdminContext"

export function Titulo() {
  const { admin } = useAdminStore()

  return (
    <nav className="bg-[#C33941] flex flex-wrap justify-between fixed top-0 left-0 w-full z-50 px-12 py-4">
      <Link to="/admin" className="flex items-center space-x-3 rtl:space-x-reverse">
        <span className="font-sans text-[#F1EEE7] text-xl font-medium">
          página da admin
        </span>
      </Link>
      <img src="./avenida.png" className="h-8.5 " alt="avenida" />

      <div className="flex me-4 items-center font-regular font-sans text-[#F1EEE7]">
        <FiUsers className="mr-2" />
        {admin.nome}
      </div>
    </nav>
  )
}