import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useClienteStore } from './context/ClienteContext';
import type { ProdutoType } from './utils/ProdutoType';
import { toast } from 'sonner';
import { QRCodeCanvas } from 'qrcode.react';

const apiUrl = import.meta.env.VITE_API_URL;
const siteUrl = window.location.origin;

export default function PaginaCompra() {
    const { id: produtoId } = useParams();
    const navigate = useNavigate();
    const { cliente } = useClienteStore();

    const [produto, setProduto] = useState<ProdutoType | null>(null);
    const [metodoPagamento, setMetodoPagamento] = useState("PIX");
    const [mostrarQrCode, setMostrarQrCode] = useState(false);
    const [urlQrCode, setUrlQrCode] = useState("");


    useEffect(() => {
        if (!cliente.token) {
            toast.error("Sessão expirada. Faça o login novamente.");
            navigate('/login');
            return;
        }

        async function getProduto() {
            try {
                const response = await fetch(`${apiUrl}/produtos/${produtoId}`);
                if (!response.ok) {
                    throw new Error("Produto não encontrado");
                }
                const produtoData = await response.json();

                if (!produtoData.ativo) {
                    toast.error("Que pena! Este item já foi vendido.");
                    navigate('/');
                    return;
                }
                setProduto(produtoData);
            } catch (error) {
                toast.error("Produto não encontrado ou indisponível.");
                navigate('/');
            }
        }

        getProduto();
    }, [produtoId, cliente.token, navigate]);

    function iniciarCompra(e: React.FormEvent) {
        e.preventDefault();
        if (!produto) return;

        const tentativaCompraId = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
        const urlSucesso = `${siteUrl}/compra-sucesso/${tentativaCompraId}`;
        setUrlQrCode(urlSucesso);

        const dadosCompraTemporarios = {
            clienteId: cliente.id,
            produtoId: produto.id,
            pagamento: metodoPagamento,
            valor: produto.valor,
            token: cliente.token
        };
        localStorage.setItem(`compra-${tentativaCompraId}`, JSON.stringify(dadosCompraTemporarios));

        setMostrarQrCode(true);
    }

    function handleCancelarCompra() {
        const urlParts = urlQrCode.split('/');
        const tentativaCompraId = urlParts[urlParts.length - 1];
        if (tentativaCompraId) {
            localStorage.removeItem(`compra-${tentativaCompraId}`);
        }
        setMostrarQrCode(false);
        setUrlQrCode("");
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
    if (produto.tipo === "CALCA") {
        tipoExibicao = "calça";
    } else if (produto.tipo === "CALCADO") {
        tipoExibicao = "calçado";
    }

    return (
        <div className="container mx-auto p-4 max-w-4xl mt-10">
            <form onSubmit={iniciarCompra} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <div className="card bg-white border border-[#C33941] shadow-lg">
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
                                {produto.marca && (
                                    <div className="badge badge-outline mr-2 text-[#C33941] py-3">
                                        {produto.marca}
                                    </div>
                                )}
                                {produto.material && (
                                    <div className="badge badge-outline text-[#C33941] py-3">
                                        {produto.material}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="mt-3 p-4 border border-[#C33941] rounded-lg bg-white">
                        <h3 className="font-bold text-lg text-[#C33941] mb-1">Entregar para:</h3>
                        <p className="text-gray-700">{cliente.nome}</p>
                        <p className="text-gray-700">{cliente.email}</p>
                        <p className="text-gray-700">{cliente.endereco}, {cliente.cidade}</p>
                    </div>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-md border border-[#C33941]">
                    {!mostrarQrCode ? (
                        <>
                            <h3 className="font-serif text-[#C33941] text-4xl pb-6">pagamento</h3>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text text-gray-700 mb-3">Escolha o método de pagamento:</span>
                                </label>
                                <select
                                    className="select select-bordered"
                                    value={metodoPagamento}
                                    onChange={(e) => setMetodoPagamento(e.target.value)}
                                    required
                                >
                                    <option value="PIX">PIX</option>
                                    <option value="CREDITO">Cartão de Crédito</option>
                                    <option value="DEBITO">Cartão de Débito</option>
                                </select>
                            </div>

                            <div className="divider mb-5 mt-42"></div>
                            <div className="space-y-2 text-lg">
                                <div className="flex justify-between">
                                    <span>Subtotal:</span>
                                    <span>R$ {Number(produto.valor).toLocaleString("pt-br", { minimumFractionDigits: 2 })}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Frete:</span>
                                    <span>Grátis</span>
                                </div>
                                <div className="flex justify-between font-bold text-2xl text-[#C33941]">
                                    <span>Total:</span>
                                    <span>R$ {Number(produto.valor).toLocaleString("pt-br", { minimumFractionDigits: 2 })}</span>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-lg bg-[#C33941] text-white hover:bg-[#a52e35] w-full mt-6"
                            >
                                Finalizar compra
                            </button>
                        </>
                    ) : (
                        <div className="flex flex-col items-center">
                            <h3 className="font-serif text-[#C33941] text-3xl pb-6">Confirme o Pagamento</h3>
                            <p className="text-center mb-4 text-gray-600">
                                Escaneie o código abaixo com a câmera do seu celular ou app de pagamento para finalizar a compra.
                            </p>
                            <QRCodeCanvas value={urlQrCode} size={256} />
                            <p className="mt-4 text-sm text-gray-500">Aguardando confirmação...</p>
                            <button
                                type="button"
                                onClick={handleCancelarCompra}
                                className="btn btn-lg bg-[#C33941] text-white hover:bg-[#a52e35] w-full mt-8"
                            >
                                Cancelar
                            </button>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
}

