import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const apiUrl = import.meta.env.VITE_API_URL;

export default function CompraSucesso() {
  const { id: tentativaCompraId } = useParams();
  const navigate = useNavigate();
  const [processando, setProcessando] = useState(true);

useEffect(() => {
  async function finalizarCompra() {
    try {
      const response = await fetch(`${apiUrl}/vendas/confirmar/${tentativaCompraId}`, { method: "POST" });
      if (!response.ok) throw new Error("Erro ao confirmar compra.");

      toast.success("Compra confirmada com sucesso!");
      navigate("/sucesso");
    } catch (err) {
      toast.error("Erro ao processar a compra.");
      navigate("/");
    }
  }

  finalizarCompra();
}, [tentativaCompraId, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#F1EEE7]">
      {processando && (
        <>
          <span className="loading loading-spinner loading-lg text-[#C33941]"></span>
          <p className="text-[#C33941] mt-4 text-lg">confirmando pagamento...</p>
        </>
      )}
    </div>
  );
}
