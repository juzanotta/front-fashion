import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_API_URL;

type StatusCompra = 'loading' | 'success' | 'error';

export default function PaginaCompraSucesso() {
    const { id: tentativaCompraId } = useParams();
    const [status, setStatus] = useState<StatusCompra>('loading');
    const [erroMessage, setErroMessage] = useState('Ocorreu um erro inesperado.');

    useEffect(() => {
        async function confirmarCompra() {
            if (!tentativaCompraId) {
                setErroMessage("ID da transação não encontrado.");
                setStatus('error');
                return;
            }

            const dadosSalvos = localStorage.getItem(`compra-${tentativaCompraId}`);
            if (!dadosSalvos) {
                setErroMessage("Dados da compra não encontrados ou expirados. Tente novamente.");
                setStatus('error');
                return;
            }

            const dadosCompra = JSON.parse(dadosSalvos);

            const vendaParaAPI = {
                clienteId: dadosCompra.clienteId,
                produtoId: dadosCompra.produtoId,
                pagamento: dadosCompra.pagamento,
                valor: dadosCompra.valor,
            };

            try {
                const response = await fetch(`${apiUrl}/vendas`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${dadosCompra.token}`,
                    },
                    body: JSON.stringify(vendaParaAPI),
                });

                if (response.status === 201) {
                    setStatus('success');
                } else {
                    const erro = await response.json();
                    console.error("API Error on confirmation:", erro);
                    if (erro.message?.includes('vendido') || erro.code === 'P2025') {
                        setErroMessage("Que pena! Este item acabou de ser vendido por outra pessoa.");
                    } else if (erro.erro?.issues) {
                        setErroMessage(`Erro de validação: ${erro.erro.issues[0].message}`);
                    } else {
                        setErroMessage("Não foi possível processar o seu pagamento. Tente novamente.");
                    }
                    setStatus('error');
                }
            } catch (error) {
                setErroMessage("Falha na comunicação com o servidor de pagamento.");
                setStatus('error');
            } finally {
                localStorage.removeItem(`compra-${tentativaCompraId}`);
            }
        }

        const timer = setTimeout(() => {
            confirmarCompra();
        }, 1500);

        return () => clearTimeout(timer);

    }, [tentativaCompraId]);

    if (status === 'loading') {
        return (
            <div className="flex flex-col justify-center items-center h-screen text-center bg-[#F1EEE7]">
                <span className="loading loading-spinner loading-lg text-[#C33941]"></span>
                <p className="mt-4 text-xl text-[#C33941]">A processar o seu pagamento...</p>
            </div>
        );
    }

    if (status === 'error') {
        return (
            <div className="flex flex-col justify-center items-center h-screen text-center p-4 bg-[#F1EEE7]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h1 className="mt-4 text-3xl font-bold text-gray-800">Falha na Compra</h1>
                <p className="mt-2 text-lg text-gray-600">{erroMessage}</p>
                <Link to="/" className="btn bg-[#C33941] text-white mt-8 hover:bg-[#a52e35]">
                    Voltar para a Loja
                </Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen text-center p-4 bg-[#F1EEE7]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h1 className="mt-4 text-3xl font-bold text-gray-800">Compra Finalizada com Sucesso!</h1>
            <p className="mt-2 text-lg text-gray-600">Obrigado por comprar connosco! Um e-mail de confirmação foi enviado.</p>
            <Link to="/" className="btn bg-[#C33941] text-white mt-8 hover:bg-[#a52e35]">
                Continuar a Comprar
            </Link>
        </div>
    );
}

