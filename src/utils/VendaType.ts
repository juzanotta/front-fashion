import type { ProdutoType } from "./ProdutoType"
import type { ClienteType } from "./ClienteType"

export type VendaType = {
  id: number
  clienteId: string
  produtoId: number
  valor: number
  pagamento: string
  status: string
  produto: ProdutoType
  cliente: ClienteType
  createdAt: string
  updatedAt: string
}