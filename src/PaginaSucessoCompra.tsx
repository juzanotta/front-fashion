import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';

interface DadosCompraTemp {
    clienteId: string;
    produtoId: number;
    pagamento: string;
    valor: number;
    token: string;
}

const apiUrl = import.meta.env.VITE_API_URL;

export default function PaginaCompraSucesso() {
    const { id: tentativaCompraId } = useParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState<'processando' | 'sucesso' | 'erro'>('processando');
    const [mensagemErro, setMensagemErro] = useState<string | null>(null);
    const [vendaId, setVendaId] = useState<number | null>(null);

    useEffect(() => {
        if (!apiUrl) {
            console.error("Erro Crítico: VITE_API_URL não definida.");
            setStatus('erro');
            setMensagemErro("Erro de configuração interna.");
            return;
        }

        if (!tentativaCompraId) {
            console.error("PaginaCompraSucesso: ID da tentativa inválido na URL.");
            toast.error("ID da tentativa de compra inválido.");
            navigate('/');
            return;
        }

        const chaveLocalStorage = `compra-${tentativaCompraId}`;
        console.log(`PaginaCompraSucesso: A tentar ler a chave: ${chaveLocalStorage}`);

        const dadosCompraJSON = localStorage.getItem(chaveLocalStorage);

        if (!dadosCompraJSON) {
            console.error("PaginaCompraSucesso: Dados NÃO encontrados no localStorage para a chave:", chaveLocalStorage);
            toast.error("Dados da compra não encontrados ou expirados.");
            setStatus('erro');
            setMensagemErro("Não foi possível encontrar os dados da sua compra. Tente novamente.");
            return;
        }

        console.log("PaginaCompraSucesso: Dados encontrados no localStorage:", dadosCompraJSON);

        let dadosCompra: DadosCompraTemp;
        try {
            dadosCompra = JSON.parse(dadosCompraJSON);
        } catch (e) {
             console.error("PaginaCompraSucesso: Erro ao fazer parse dos dados JSON:", e);
             toast.error("Erro ao processar dados da compra.");
             setStatus('erro');
             setMensagemErro("Ocorreu um erro ao ler os dados da sua compra.");
             localStorage.removeItem(chaveLocalStorage);
             return;
        }

        const vendaParaAPI = {
            clienteId: dadosCompra.clienteId,
            produtoId: dadosCompra.produtoId,
            pagamento: dadosCompra.pagamento,
            valor: dadosCompra.valor
        };

        const finalizarVendaNaAPI = async () => {
             try {
                const response = await fetch(`${apiUrl}/vendas`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${dadosCompra.token}`
                    },
                    body: JSON.stringify(vendaParaAPI)
                });

                localStorage.removeItem(chaveLocalStorage); // Limpa sempre após tentar

                if (response.status === 201) {
                    const vendaCriada = await response.json();
                    setVendaId(vendaCriada.id);
                    setStatus('sucesso');
                } else {
                    const erro = await response.json();
                    console.error("Erro da API ao criar venda:", erro);
                    if (erro.message?.includes('vendido')) {
                         setMensagemErro("Que pena! Este item foi vendido momentos antes de você confirmar.");
                    } else {
                         const errorMsg = erro.message || erro.erro || "Ocorreu um erro ao registar o seu pedido. Por favor, contacte o suporte.";
                         setMensagemErro(String(errorMsg));
                    }
                    setStatus('erro');
                }
             } catch (error) {
                 console.error("Erro de rede ao finalizar venda:", error);
                 localStorage.removeItem(chaveLocalStorage);
                 setMensagemErro("Não foi possível conectar ao servidor para confirmar seu pedido. Verifique sua conexão e tente novamente.");
                 setStatus('erro');
             }
        };

        finalizarVendaNaAPI();

    }, [tentativaCompraId, navigate]);

    // --- Renderização ---
    return (
        <div className="container mx-auto p-4 max-w-2xl mt-20 flex flex-col items-center text-center">

            {status === 'processando' && (
                 <>
                    <span className="loading loading-spinner loading-lg text-[#C33941] mb-6"></span>
                    <h1 className="text-2xl font-bold text-gray-700">A processar o seu pedido...</h1>
                    <p className="text-gray-500 mt-2">Por favor, aguarde um momento.</p>
                </>
            )}
            {status === 'sucesso' && (
                 <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h1 className="text-3xl font-bold text-[#C33941] mb-4">Pedido Realizado com Sucesso!</h1>
                    {vendaId && <p className="text-lg text-gray-700">O número do seu pedido é: #{vendaId}</p>}
                    <p className="text-gray-600 mt-2">Obrigado por comprar na Avenida Fashion!</p>
                    <p className="text-gray-500 mt-1">Enviaremos um e-mail com a confirmação e os detalhes de envio assim que o pagamento for processado e o pedido despachado.</p>
                    <Link to="/" className="btn bg-[#C33941] text-white hover:bg-[#a52e35] mt-8">
                        Voltar à Loja
                    </Link>
                </>
            )}
            {status === 'erro' && (
                 <>
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                         <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                     </svg>
                    <h1 className="text-3xl font-bold text-red-600 mb-4">Erro ao Processar o Pedido</h1>
                    <p className="text-gray-600">{mensagemErro || "Ocorreu um erro inesperado."}</p>
                    <Link to="/" className="btn bg-gray-500 text-white hover:bg-gray-600 mt-8">
                        Voltar à Loja
                    </Link>
                </>
            )}
        </div>
    );
}

