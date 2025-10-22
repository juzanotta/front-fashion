import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
// Corrigido o caminho relativo - ajuste se necessário, assumindo que context está em src/context
import { useClienteStore } from './context/ClienteContext';

// Assume que VITE_API_URL está definida no .env
const apiUrl = import.meta.env.VITE_API_URL;

export default function PaginaCompraSucesso() {
    const { id: tentativaCompraIdUrl } = useParams(); // ID temporário da URL
    const navigate = useNavigate();
    // Pega o estado da compra pendente e a função para limpar do store Zustand
    const { compraPendente, limparCompraPendente } = useClienteStore();

    const [status, setStatus] = useState<'processando' | 'sucesso' | 'erro'>('processando');
    const [mensagemErro, setMensagemErro] = useState<string | null>(null);
    const [vendaId, setVendaId] = useState<number | null>(null); // Para guardar o ID da venda criada

    useEffect(() => {
        // Garante que a URL da API está definida
        if (!apiUrl) {
             console.error("Erro Crítico: VITE_API_URL não definida.");
             setStatus('erro');
             setMensagemErro("Erro de configuração interna.");
             return;
        }

        // Garante que o ID da URL existe
        if (!tentativaCompraIdUrl) {
            console.error("PaginaCompraSucesso: ID da tentativa inválido na URL.");
            toast.error("ID da tentativa de compra inválido.");
            navigate('/');
            return;
        }

        // Lê o estado da compra pendente do Zustand
        console.log(`PaginaCompraSucesso: A verificar compra pendente no Zustand para ID URL: ${tentativaCompraIdUrl}`);

        if (!compraPendente) {
            console.error("PaginaCompraSucesso: Nenhuma compra pendente encontrada no Zustand.");
            setStatus('erro');
            setMensagemErro("Não foi possível encontrar os dados da sua compra. A sessão pode ter expirado ou os dados foram limpos.");
            // Não precisa limpar o store aqui, pois já está vazio
            return;
        }

        // Verifica se o ID da URL corresponde ao ID guardado no store
        if (compraPendente.tentativaCompraId !== tentativaCompraIdUrl) {
             console.error(`PaginaCompraSucesso: ID da URL (${tentativaCompraIdUrl}) não bate com ID no Store (${compraPendente.tentativaCompraId}).`);
             toast.error("Inconsistência nos dados da compra.");
             setStatus('erro');
             setMensagemErro("Ocorreu uma inconsistência ao verificar os dados da compra.");
             limparCompraPendente(); // Limpa o estado inconsistente do store
             return;
        }
        console.log("PaginaCompraSucesso: Dados da compra pendente encontrados no Zustand:", compraPendente);

        // Prepara os dados a serem enviados para a API (POST /vendas)
        const vendaParaAPI = {
            clienteId: compraPendente.clienteId,
            produtoId: compraPendente.produtoId,
            pagamento: compraPendente.pagamento,
            valor: compraPendente.valor
        };

        // Função assíncrona para chamar a API e finalizar a venda
        const finalizarVendaNaAPI = async () => {
             try {
                const response = await fetch(`${apiUrl}/vendas`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        // Usa o token guardado no estado pendente para autenticar
                        "Authorization": `Bearer ${compraPendente.token}`
                    },
                    body: JSON.stringify(vendaParaAPI)
                });

                // Limpa o estado pendente do Zustand *depois* de tentar a API
                limparCompraPendente();
                console.log("PaginaCompraSucesso: Compra pendente limpa do Zustand.");


                if (response.status === 201) { // 201 Created = Sucesso
                    const vendaCriada = await response.json();
                    setVendaId(vendaCriada.id); // Guarda o ID da venda para mostrar ao utilizador
                    setStatus('sucesso');
                    console.log("PaginaCompraSucesso: Venda criada com sucesso:", vendaCriada);
                } else { // Trata erros da API (4xx, 5xx)
                    const erro = await response.json();
                    console.error("Erro da API ao criar venda:", erro);
                    // Verifica se o erro é específico de item já vendido (baseado na sua API)
                    if (erro.message?.includes('vendido')) {
                         setMensagemErro("Que pena! Este item foi vendido momentos antes de você confirmar.");
                    } else {
                         // Tenta pegar uma mensagem de erro útil ou usa uma genérica
                         const errorMsg = erro.message || erro.erro?.issues?.[0]?.message || erro.erro || "Ocorreu um erro ao registar o seu pedido. Por favor, contacte o suporte.";
                         setMensagemErro(String(errorMsg)); // Garante que é string
                    }
                    setStatus('erro');
                }
             } catch (error) { // Trata erros de rede/conexão
                 console.error("Erro de rede ao finalizar venda:", error);
                 limparCompraPendente(); // Limpa o estado pendente em caso de erro de rede
                 setMensagemErro("Não foi possível conectar ao servidor para confirmar seu pedido. Verifique sua conexão e tente novamente.");
                 setStatus('erro');
             }
        };

        // Chama a função para finalizar a venda assim que o componente monta
         finalizarVendaNaAPI(); // Chamada direta geralmente funciona bem

    // Dependências do useEffect: executa quando o ID da URL muda ou o estado pendente é carregado
    // Removido compraPendente e limparCompraPendente das dependências para evitar loop se o estado mudar durante a execução
    }, [tentativaCompraIdUrl, navigate, limparCompraPendente, compraPendente]); // Adicionei limparCompraPendente e compraPendente para garantir a execução correta

    // Renderização baseada no estado ('processando', 'sucesso', 'erro')
    return (
        <div className="container mx-auto p-4 max-w-2xl mt-20 flex flex-col items-center text-center">
            {/* Estado de Processamento */}
            {status === 'processando' && (
                 <>
                    <span className="loading loading-spinner loading-lg text-[#C33941] mb-6"></span>
                    <h1 className="text-2xl font-bold text-gray-700">A processar o seu pedido...</h1>
                    <p className="text-gray-500 mt-2">Por favor, aguarde um momento.</p>
                </>
            )}
            {/* Estado de Sucesso */}
            {status === 'sucesso' && (
                 <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h1 className="text-3xl font-bold text-[#C33941] mb-4">Pedido Realizado com Sucesso!</h1>
                    {/* Mostra o número do pedido se disponível */}
                    {vendaId && <p className="text-lg text-gray-700">O número do seu pedido é: #{vendaId}</p>}
                    <p className="text-gray-600 mt-2">Obrigado por comprar na Avenida Fashion!</p>
                    <p className="text-gray-500 mt-1">Enviaremos um e-mail com a confirmação e os detalhes de envio assim que o pagamento for processado e o pedido despachado.</p>
                    {/* Link para voltar à loja */}
                    <Link to="/" className="btn bg-[#C33941] text-white hover:bg-[#a52e35] mt-8">
                        Voltar à Loja
                    </Link>
                </>
            )}
            {/* Estado de Erro */}
            {status === 'erro' && (
                 <>
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                         <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                     </svg>
                    <h1 className="text-3xl font-bold text-red-600 mb-4">Erro ao Processar o Pedido</h1>
                    {/* Exibe a mensagem de erro específica */}
                    <p className="text-gray-600">{mensagemErro || "Ocorreu um erro inesperado."}</p>
                    {/* Link para voltar à loja */}
                    <Link to="/" className="btn bg-gray-500 text-white hover:bg-gray-600 mt-8">
                        Voltar à Loja
                    </Link>
                </>
            )}
        </div>
    );
}

