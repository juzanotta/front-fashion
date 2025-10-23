import { useEffect, useState } from "react";
import { useClienteStore } from "./context/ClienteContext";
import type { VendaType } from "./utils/VendaType";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const apiUrl = import.meta.env.VITE_API_URL

function StatusBadge({ status }: { status: string }) {
    let corBase = "bg-gray-200 text-gray-800";

    switch (status) {
        case "ENVIADO":
            corBase = "bg-blue-200 text-blue-800";
            break;
        case "ENTREGUE":
            corBase = "bg-green-200 text-green-800";
            break;
        case "CANCELADO":
            corBase = "bg-red-200 text-red-800";
            break;
        case "PENDENTE":
        default:
            corBase = "bg-yellow-200 text-yellow-800";
            break;
    }

    return (
        <span className={`px-3 py-1 text-sm font-medium rounded-full ${corBase}`}>
            {status.toLowerCase()}
        </span>
    );
}

export default function Pedidos() {
    const [vendas, setVendas] = useState<VendaType[]>([])
    const { cliente } = useClienteStore()
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {

        if (!cliente.token || !cliente.id) {
            toast.error("Sessão expirada. Faça o login novamente.");
            navigate('/login');
            return;
        }


        async function getMinhasVendas() {
            setLoading(true);
            try {

                const response = await fetch(`${apiUrl}/vendas/${cliente.id}`, {
                    headers: {
                        'Content-Type': 'application/json',

                        'Authorization': `Bearer ${cliente.token}`
                    }
                });

                if (!response.ok) {
                    const erro = await response.json();
                    throw new Error(erro.error || "Falha ao buscar pedidos.");
                }

                const dados = await response.json();
                if (Array.isArray(dados)) {
                    setVendas(dados);
                }

            } catch (error) {
                console.error("Erro ao buscar meus pedidos:", error);
                toast.error((error as Error).message);
            } finally {
                setLoading(false);
            }
        }

        getMinhasVendas();
    }, [cliente.token, cliente.id, navigate]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-[#F1EEE7]">
                <span className="loading loading-spinner loading-lg text-[#C33941]"></span>
            </div>
        );
    }
    return (
        <div className='bg-[#F1EEE7] min-h-screen pt-24'>
            <div className="container mx-auto p-4 max-w-4xl">
                <h1 className="font-serif text-[#C33941] text-4xl pb-10">meus pedidos</h1>

                {vendas.length === 0 ? (
                    <div className="text-center p-10 bg-white rounded-lg shadow border border-[#C33941]">
                        <p className="text-gray-600 text-lg">você ainda não fez nenhuma compra.</p>
                        <Link to="/" className="btn btn-lg bg-[#C33941] text-white hover:bg-[#a52e35] mt-6">
                            ver produtos
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {vendas.map((venda) => (
                            <div key={venda.id} className="card lg:card-side bg-white shadow-md border border-[#C33941]">
                                <figure className="lg:w-1/4 p-4">
                                    <img
                                        src={venda.produto.foto}
                                        alt={venda.produto.tipo}
                                        className="w-full h-48 lg:h-full object-cover rounded-lg"
                                        onError={(e) => (e.currentTarget.src = 'https://placehold.co/300x300/C33941/F1EEE7?text=Sem+Foto')}
                                    />
                                </figure>
                                <div className="card-body lg:w-3/4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h2 className="card-title text-2xl font-bold text-[#C33941]">
                                                {venda.produto.tipo.toLowerCase()} {venda.produto.cor}
                                            </h2>
                                            <p className="text-gray-500 text-sm mt-1">
                                                pedido #{venda.id} | data: {new Date(venda.createdAt).toLocaleDateString('pt-br')}
                                            </p>
                                        </div>
                                        <StatusBadge status={venda.status} />
                                    </div>

                                    <div className="divider my-2"></div>

                                    <div className="flex justify-between items-center mt-2">
                                        <div>
                                            <p className="text-gray-600">pagamento: <span className="font-medium text-gray-900">{venda.pagamento}</span></p>
                                            <p className="text-gray-600">tamanho: <span className="font-medium text-gray-900">{venda.produto.tamanho}</span></p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-gray-500">valor total</p>
                                            <p className="text-2xl font-bold text-[#C33941]">
                                                {Number(venda.valor).toLocaleString("pt-br", { style: 'currency', currency: 'BRL' })}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}