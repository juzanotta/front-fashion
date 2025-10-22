import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// Corrigido o caminho relativo - ajuste se necessário
import { useClienteStore } from './context/ClienteContext';
import type { ProdutoType } from './utils/ProdutoType';
import { toast } from 'sonner';
// Corrigido: A importação correta para QRCodeCanvas (geralmente é exportação nomeada)
import { QRCodeCanvas } from 'qrcode.react';

// Assume que VITE_API_URL está definida no .env e é acessível globalmente
// Se estiver a usar Vite, import.meta.env.VITE_API_URL funciona
const apiUrl = import.meta.env.VITE_API_URL;
// Pega a URL base do site atual (ex: http://localhost:5173 ou https://seu-site.vercel.app)
const siteUrl = window.location.origin;

export default function PaginaCompra() {
    const { id: produtoId } = useParams(); // Pega o ID do produto da URL
    const navigate = useNavigate();
    // Pega o cliente logado e as ações relevantes do store Zustand
    const { cliente, iniciarCompraPendente, limparCompraPendente } = useClienteStore();

    const [produto, setProduto] = useState<ProdutoType | null>(null);
    const [metodoPagamento, setMetodoPagamento] = useState("PIX");
    const [mostrarQrCode, setMostrarQrCode] = useState(false);
    const [urlQrCode, setUrlQrCode] = useState("");
    // Guarda o ID temporário no estado local para usar no cancelamento
    const [tentativaCompraIdAtual, setTentativaCompraIdAtual] = useState<string | null>(null);

    // Efeito para buscar os detalhes do produto quando o componente monta ou o ID muda
    useEffect(() => {
        // Verifica se o cliente está logado (redundante, mas seguro)
         if (!cliente.token) {
            toast.error("Sessão expirada. Faça o login novamente.");
            navigate('/login');
            return;
         }

         // Função assíncrona para buscar o produto na API
         async function getProduto() {
             try {
                // Garante que a URL da API está definida
                if (!apiUrl) {
                    console.error("VITE_API_URL não está definida.");
                    toast.error("Erro de configuração interna.");
                    navigate('/'); // Volta para home em caso de erro grave
                    return;
                }
                const response = await fetch(`${apiUrl}/produtos/${produtoId}`);
                if (!response.ok) {
                    throw new Error("Produto não encontrado");
                }
                const data = await response.json();
                // Verifica se o produto já foi vendido (ativo: false)
                if (!data.ativo) {
                    toast.error("Que pena! Este item já foi vendido.");
                    navigate('/'); // Volta para home se já vendido
                    return;
                }
                setProduto(data); // Guarda os dados do produto no estado local
             } catch (error) {
                console.error("Erro ao buscar produto:", error);
                toast.error("Produto não encontrado ou indisponível.");
                navigate('/'); // Volta para home em caso de erro
             }
         }
         getProduto(); // Chama a função de busca
    }, [produtoId, cliente.token, navigate]); // Dependências do useEffect

    // Função chamada ao submeter o formulário (clicar em "Gerar QR Code")
    function iniciarCompra(e: React.FormEvent) {
        e.preventDefault(); // Impede o recarregamento da página
        if (!produto) return; // Segurança: não faz nada se o produto ainda não carregou

        // Cria um ID único para esta tentativa de compra
        const tentativaCompraId = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
        setTentativaCompraIdAtual(tentativaCompraId); // Guarda o ID localmente para o botão cancelar

        // Monta a URL que o QR code vai conter (aponta para a página de sucesso)
        const urlSucesso = `${siteUrl}/compra-sucesso/${tentativaCompraId}`;
        setUrlQrCode(urlSucesso); // Guarda a URL no estado para o componente QRCodeCanvas

        // Prepara o objeto com os dados da compra para guardar no Zustand
        const dadosCompraParaStore = {
            tentativaCompraId: tentativaCompraId, // Inclui o ID temporário
            clienteId: cliente.id,
            produtoId: produto.id,
            pagamento: metodoPagamento,
            valor: produto.valor,
            token: cliente.token // Guarda o token para autenticar na API na próxima etapa
        };

        // Chama a ação do Zustand para guardar os dados da compra pendente
        iniciarCompraPendente(dadosCompraParaStore);
        console.log(`Dados da compra pendente salvos no Zustand para ID: ${tentativaCompraId}`);

        setMostrarQrCode(true); // Muda o estado para exibir o QR Code
    }

    // Função chamada ao clicar no botão "Cancelar" (na tela do QR Code)
    function handleCancelarCompra() {
        // Chama a ação do Zustand para limpar os dados da compra pendente
        limparCompraPendente();
        console.log(`Compra pendente cancelada e limpa do Zustand (ID: ${tentativaCompraIdAtual})`);

        // Reseta os estados locais para voltar à tela de seleção de pagamento
        setMostrarQrCode(false);
        setUrlQrCode("");
        setTentativaCompraIdAtual(null);
        toast.info("A compra foi cancelada.");
    }

    // Renderização do estado de loading enquanto o produto não carrega
    if (!produto) {
        return (
             <div className="flex justify-center items-center h-screen">
                 <span className="loading loading-spinner loading-lg text-[#C33941]"></span>
             </div>
        );
    }

    // Renderização principal da página
    return (
        <div className="container mx-auto p-4 max-w-4xl mt-10">
            <h1 className="text-3xl font-bold text-[#C33941] mb-6">Finalizar Compra</h1>
            {/* O formulário agora só chama iniciarCompra */}
            <form onSubmit={iniciarCompra} className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Coluna Esquerda: Detalhes do Produto e Cliente */}
                <div>
                    {/* Card do Produto */}
                     <div className="card bg-[#F1EEE7] border border-[#C33941] shadow-lg mb-6">
                        <figure className="px-5 pt-5">
                            <img src={produto.foto} alt={produto.tipo} className="rounded-xl w-full h-72 object-cover" />
                        </figure>
                        <div className="card-body p-5">
                             <h2 className="card-title text-2xl text-[#C33941]">{produto.tipo} {produto.cor}</h2>
                             <p className="text-xl text-[#C33941] font-bold">
                                 R$ {Number(produto.valor).toLocaleString("pt-br", { minimumFractionDigits: 2 })}
                             </p>
                             {/* Poderia adicionar Marca/Material aqui se quisesse */}
                         </div>
                    </div>
                    {/* Detalhes de Entrega */}
                    <div className="p-4 border border-[#C33941] rounded-lg bg-[#F1EEE7]">
                        <h3 className="font-bold text-lg text-[#C33941] mb-1">Entregar para:</h3>
                        <p className="text-gray-700">{cliente.nome}</p>
                        <p className="text-gray-700">{cliente.email}</p>
                        {/* Garante que endereço e cidade não causem erro se forem null/undefined */}
                        <p className="text-gray-700">{cliente.endereco || 'Endereço não informado'}, {cliente.cidade || 'Cidade não informada'}</p>
                     </div>
                </div>

                {/* Coluna Direita: Pagamento ou QR Code */}
                <div className="p-6 bg-white rounded-lg shadow-md border border-[#C33941]">
                    {/* Renderização Condicional: Mostra formulário ou QR Code */}
                    {!mostrarQrCode ? (
                        // SE NÃO ESTIVER MOSTRANDO O QR CODE (ESTADO INICIAL)
                        <>
                            <h3 className="font-serif text-[#C33941] text-4xl pb-6">pagamento</h3>
                            {/* Seleção do Método de Pagamento */}
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text text-gray-700 mb-3">Escolha o método de pagamento:</span>
                                </label>
                                <select
                                    className="select select-bordered w-full" // Garante largura total
                                    value={metodoPagamento}
                                    onChange={(e) => setMetodoPagamento(e.target.value)}
                                    required // Campo obrigatório
                                >
                                    <option value="PIX">PIX</option>
                                    <option value="CREDITO">Cartão de Crédito</option>
                                    <option value="DEBITO">Cartão de Débito</option>
                                </select>
                            </div>
                            {/* Linha Divisória e Resumo do Total */}
                            <div className="divider my-6"></div> {/* Ajustado margin */}
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
                            {/* Botão para Gerar o QR Code */}
                            <button
                                type="submit"
                                className="btn btn-lg bg-[#C33941] text-white hover:bg-[#a52e35] w-full mt-8" // Aumentado margin top
                            >
                                Gerar QR Code para Pagamento
                            </button>
                        </>
                    ) : (
                        // SE ESTIVER MOSTRANDO O QR CODE
                        <div className="flex flex-col items-center">
                            <h3 className="font-serif text-[#C33941] text-3xl pb-6">Confirme o Pagamento</h3>
                            <p className="text-center mb-4 text-gray-600">
                                Escaneie o código abaixo com a câmera do seu celular ou app de pagamento para finalizar a compra.
                            </p>
                            {/* Componente que renderiza o QR Code */}
                            <QRCodeCanvas value={urlQrCode} size={256} />
                            <p className="mt-4 text-sm text-gray-500">Aguardando confirmação...</p>
                            {/* Botão para Cancelar */}
                            <button
                                type="button" // Importante: type="button" para não submeter o form
                                onClick={handleCancelarCompra}
                                className="btn btn-outline border-[#C33941] text-[#C33941] hover:bg-[#C33941] hover:text-white w-full mt-8" // Estilo diferente para cancelar
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

