import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const apiUrl = import.meta.env.VITE_API_URL;

export default function CompraSucesso() {
  const navigate = useNavigate();

  useEffect(() => {
    async function finalizarCompra() {
      try {
        // Recupera os dados do QR code do localStorage
        const qrDataStr = localStorage.getItem("compra-qrcode");
        if (!qrDataStr) throw new Error("Dados da compra não encontrados");

        const dadosCompra = JSON.parse(qrDataStr);

        const response = await fetch(`${apiUrl}/vendas`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dadosCompra),
        });

        if (!response.ok) throw new Error("Erro ao processar a compra");

        toast.success("Compra confirmada com sucesso!");
        localStorage.removeItem("compra-qrcode");
        navigate("/sucesso");
      } catch (err) {
        toast.error("Erro ao processar o pagamento.");
        navigate("/");
      }
    }

    finalizarCompra();
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#F1EEE7]">
      <span className="loading loading-spinner loading-lg text-[#C33941]"></span>
      <p className="text-[#C33941] mt-4 text-lg">confirmando pagamento...</p>
    </div>
  );
}
