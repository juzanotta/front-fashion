import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const apiUrl = import.meta.env.VITE_API_URL;

export default function CompraSucesso() {
  const { id: tentativaCompraId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function finalizarCompra() {
      const dadosCompraStr = localStorage.getItem(`compra-${tentativaCompraId}`);
      if (!dadosCompraStr) {
        toast.error("Não foi possível encontrar a compra.");
        navigate("/");
        return;
      }

      const dadosCompra = JSON.parse(dadosCompraStr);

      try {
        const response = await fetch(`${apiUrl}/vendas`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            clienteId: dadosCompra.clienteId,
            produtoId: dadosCompra.produtoId,
            pagamento: dadosCompra.pagamento,
            valor: dadosCompra.valor,
          }),
        });

        if (!response.ok) {
          const erro = await response.json();
          toast.error(erro.message || "Erro ao finalizar a compra.");
          navigate("/");
          return;
        }

        toast.success("Compra confirmada com sucesso!");
        localStorage.removeItem(`compra-${tentativaCompraId}`);
        navigate(`/sucesso`);
      } catch (err) {
        toast.error("Erro ao processar o pagamento.");
        navigate("/");
      }
    }

    finalizarCompra();
  }, [tentativaCompraId, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#F1EEE7]">
      <span className="loading loading-spinner loading-lg text-[#C33941]"></span>
      <p className="text-[#C33941] mt-4 text-lg">confirmando pagamento...</p>
    </div>
  );
}
