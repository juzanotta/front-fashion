import { PrismaClient } from '@prisma/client'
import { Router } from 'express'
import { z } from 'zod'

const prisma = new PrismaClient()

const router = Router()

const vendaSchema = z.object({
  clienteId: z.number(),
  produtoId: z.number(),
  quantidade: z.number().positive({ message: "Quantidade deve ser positiva" })
})

router.get("/", async (req, res) => {
  try {
    const vendas = await prisma.venda.findMany({
      include: {
        cliente: true,
        produto: true
      }
    })
    res.status(200).json(vendas)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

router.post("/", async (req, res) => {

  const valida = vendaSchema.safeParse(req.body)
  if (!valida.success) {
    res.status(400).json({ erro: valida.error })
    return
  }

  const { clienteId, produtoId, quantidade } = valida.data

  const dadocliente = await prisma.cliente.findUnique({
    where: { id: clienteId }
  })

  if (!dadocliente) {
    res.status(400).json({ erro: "Erro... Código do cliente inválido" })
    return
  }

  const dadoProduto = await prisma.produto.findUnique({
    where: { id: produtoId }
  })

  if (!dadoProduto) {
    res.status(400).json({ erro: "Erro... Código do produto inválido" })
    return
  }

  if (dadoProduto.quantidade < quantidade) {
    res.status(400).json({ erro: `Erro... Tem apenas ${dadoProduto.quantidade} unidades em estoque` })
    return
  }

  if (quantidade * Number(dadoProduto.valor) > Number(dadocliente.saldo)) {
    res.status(400).json({ erro: `Erro... Saldo do cliente é de R$: ${dadocliente.saldo}` })
    return
  }

  try {
    const [venda, cliente, produto] = await prisma.$transaction([
      prisma.venda.create({
        data: { clienteId, produtoId, quantidade, valor: Number(dadoProduto.valor) }
      }),
      prisma.cliente.update({
        where: { id: clienteId },
        data: { saldo: { decrement: quantidade * Number(dadoProduto.valor) } }
      }),
      prisma.produto.update({
        where: { id: produtoId },
        data: { quantidade: { decrement: quantidade } }
      })
    ])
    res.status(201).json({ venda, cliente, produto })
  } catch (error) {
    res.status(400).json({ error })
  }
})

router.delete("/:id", async (req, res) => {
  const { id } = req.params

  try {

    const vendaExcluida = await prisma.venda.findUnique({ where: { id: Number(id) } })

    const [venda, cliente, produto] = await prisma.$transaction([
      prisma.venda.delete({ where: { id: Number(id) } }),
      prisma.cliente.update({
        where: { id: vendaExcluida?.clienteId },
        data: { saldo: { increment: Number(vendaExcluida?.quantidade) * Number(vendaExcluida?.valor) } }
      }),
      prisma.produto.update({
        where: { id: vendaExcluida?.produtoId },
        data: { quantidade: { increment: Number(vendaExcluida?.quantidade) } }
      })
    ])

    res.status(200).json({ venda, cliente, produto })
  } catch (error) {
    res.status(400).json({ erro: error })
  }
})

export default router
