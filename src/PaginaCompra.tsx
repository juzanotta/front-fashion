import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useClienteStore } from './context/ClienteContext';
import type { ProdutoType } from './utils/ProdutoType';
import { toast } from 'sonner';
import { QRCodeCanvas } from 'qrcode.react';

const apiUrl = import.meta.env.VITE_API_URL;

export default function PaginaCompra() {
    const { id: produtoId } = useParams();
    const navigate = useNavigate();
    const { cliente } = useClienteStore();

    const [produto, setProduto] = useState<ProdutoType | null>(null);
    const [metodoPagamento, setMetodoPagamento] = useState("PIX");
    const [mostrarQrCode, setMostrarQrCode] = useState(false);
    const [tentativaId, setTentativaId] = useState<string>("");

    useEffect(() => {
        if (!cliente.token) {
            toast.error("Sessão expirada. Faça o login novamente.");
            navigate('/login');
            return;
        }

        async function getProduto() {
            try {
                const res = await fetch(`${apiUrl}/produtos/${produtoId}`);
                if (!res.ok) throw new Error("Produto não encontrado");
                const data = await res.json();
                if (!data.ativo) {
                    toast.error("Que pena! Este item já foi vendido.");
                    navigate('/');
                    return;
                }
                setProduto(data);
            } catch {
                toast.error("Produto não encontrado ou indisponível.");
                navigate('/');
            }
        }

        getProduto();
    }, [produtoId, cliente.token, navigate]);

    async function iniciarCompra(e: React.FormEvent) {
        e.preventDefault();
        if (!produto) return;

        try {
            const res = await fetch(`${apiUrl}/vendas/tentativa`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    clienteId: cliente.id,
                    produtoId: produto.id,
                    pagamento: metodoPagamento,
                    valor: produto.valor
                })
            });

            if (!res.ok) throw new Error("Erro ao criar tentativa de compra");
            const data = await res.json();
            setTentativaId(data.id);
            setMostrarQrCode(true);

        } catch (err) {
            toast.error("Não foi possível iniciar a compra.");
        }
    }

    function handleCancelarCompra() {
        setMostrarQrCode(false);
        setTentativaId("");
        toast.info("A compra foi cancelada.");
    }

    if (!produto) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-lg text-[#C33941]"></span>
            </div>
        );
    }

    let tipoExibicao = produto.tipo.toLowerCase();
    if (produto.tipo === "CALCA") tipoExibicao = "calça";
    else if (produto.tipo === "CALCADO") tipoExibicao = "calçado";

    return (
        <div className='bg-[#F1EEE7]'>
            <div className="container mx-auto p-4 max-w-4xl pt-22">
                <form onSubmit={iniciarCompra} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <div className="card bg-[#F1EEE7] border border-[#C33941] shadow-lg">
                            <figure className="px-5 pt-5">
                                <img src={produto.foto} alt={tipoExibicao} className="rounded-xl w-full h-72 object-cover" />
                            </figure>
                            <div className="card-body p-5">
                                <h2 className="card-title font-sans font-bold text-xl text-[#C33941]">
                                    {tipoExibicao} {produto.cor}
                                </h2>
                                <p className="font-sans text-[#C33941] text-lg">
                                    {produto.tamanho} | R$ {Number(produto.valor).toLocaleString("pt-br", { minimumFractionDigits: 2 })}
                                </p>
                                <div className='flex-row'>
                                    {produto.marca && <div className="badge badge-outline mr-2 text-[#C33941] py-3">{produto.marca}</div>}
                                    {produto.material && <div className="badge badge-outline text-[#C33941] py-3">{produto.material}</div>}
                                </div>
                            </div>
                        </div>
                        <div className="mt-3 p-4 border border-[#C33941] rounded-lg bg-[#F1EEE7]">
                            <h3 className="font-bold text-lg text-[#C33941] mb-1">entregar para:</h3>
                            <p className="text-gray-700">{cliente.nome}</p>
                            <p className="text-gray-700">{cliente.email}</p>
                            <p className="text-gray-700">{cliente.endereco}, {cliente.cidade}</p>
                        </div>
                    </div>
                    <div className="p-6 bg-[#F1EEE7] rounded-lg shadow-md border border-[#C33941]">
                        {!mostrarQrCode ? (
                            <>
                                <h3 className="font-serif text-[#C33941] text-4xl pb-6">pagamento</h3>
                                <select className="select select-auto" value={metodoPagamento} onChange={e => setMetodoPagamento(e.target.value)} required>
                                    <option value="PIX">PIX</option>
                                    <option value="CREDITO">cartão de crédito</option>
                                    <option value="DEBITO">cartão de débito</option>
                                </select>

                                <div className="divider mb-5 mt-42"></div>
                                <div className="space-y-2 text-lg">
                                    <div className="flex justify-between">
                                        <span>subtotal:</span>
                                        <span>R$ {Number(produto.valor).toLocaleString("pt-br", { minimumFractionDigits: 2 })}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>frete:</span>
                                        <span>grátis</span>
                                    </div>
                                    <div className="flex justify-between font-bold text-2xl text-[#C33941]">
                                        <span>total:</span>
                                        <span>R$ {Number(produto.valor).toLocaleString("pt-br", { minimumFractionDigits: 2 })}</span>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-lg bg-[#C33941] text-white hover:bg-[#a52e35] w-full mt-6">
                                    finalizar compra
                                </button>
                            </>
                        ) : (
                            <div className="flex flex-col items-center">
                                <h3 className="font-serif text-[#C33941] text-3xl pb-6">confirme o pagamento</h3>
                                <QRCodeCanvas value={`${window.location.origin}/compra-sucesso/${tentativaId}`} size={256} className='p-2 rounded-2xl border-2 border-[#C33941] bg-white'/>
                                <p className="mt-4 text-sm text-gray-500">aguardando confirmação...</p>
                                <button type="button" onClick={handleCancelarCompra} className="btn btn-lg bg-[#C33941] text-white hover:bg-[#a52e35] w-full mt-8">
                                    cancelar
                                </button>
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
