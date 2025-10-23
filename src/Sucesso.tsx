import { useNavigate } from "react-router-dom";

export default function Sucesso() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#F1EEE7]">
      <h1 className="text-4xl font-bold text-[#C33941] mb-4">compra concluída!</h1>
      <p className="text-lg text-gray-700 mb-6">seu pedido foi processado com sucesso.</p>
      <button
        onClick={() => navigate("/")}
        className="btn bg-[#C33941] text-white hover:bg-[#a52e35]"
      >
        voltar para a loja
      </button>
    </div>
  );
}
