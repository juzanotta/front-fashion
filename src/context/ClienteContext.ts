import type { ClienteType } from '../utils/ClienteType';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Interface para os dados temporários da compra
interface CompraPendenteData {
    tentativaCompraId: string; // Guardamos o ID para referência
    clienteId: string;
    produtoId: number;
    pagamento: string;
    valor: number;
    token: string;
}

type ClienteStore = {
    cliente: ClienteType;
    favoritosIds: number[];
    compraPendente: CompraPendenteData | null; // Novo estado para a compra
    logaCliente: (clienteLogado: ClienteType) => void;
    deslogaCliente: () => void;
    toggleFavorito: (produtoId: number) => void;
    iniciarCompraPendente: (dadosCompra: CompraPendenteData) => void; // Nova ação
    limparCompraPendente: () => void; // Nova ação
};

// Objeto inicial mais seguro
const clienteVazio: ClienteType = { id: '', nome: '', email: '', endereco: '', cidade: '', token: '' };

export const useClienteStore = create<ClienteStore>()(
    persist(
        (set, get) => ({
            cliente: clienteVazio,
            favoritosIds: [],
            compraPendente: null, // Estado inicial nulo

            logaCliente: (clienteLogado) => set({ cliente: clienteLogado }),

            deslogaCliente: () => set({ cliente: clienteVazio, favoritosIds: [], compraPendente: null }), // Limpa tudo

            toggleFavorito: (produtoId) => {
                const currentFavoritos = get().favoritosIds;
                const isFavorito = currentFavoritos.includes(produtoId);
                if (isFavorito) {
                    set({ favoritosIds: currentFavoritos.filter(id => id !== produtoId) });
                } else {
                    set({ favoritosIds: [...currentFavoritos, produtoId] });
                }
            },

            // Ação para guardar os dados da compra pendente no store
            iniciarCompraPendente: (dadosCompra) => set({ compraPendente: dadosCompra }),

            // Ação para limpar os dados da compra pendente do store
            limparCompraPendente: () => set({ compraPendente: null }),

        }),
        {
            name: 'cliente-avenida-fashion', // Chave no localStorage
        }
    )
);

