import { PrismaClient } from '@prisma/client'
import { Router } from 'express'
import { z } from 'zod'

const prisma = new PrismaClient()

const router = Router()

const vendaSchema = z.object({
  usuarioId: z.number(),
  produtoId: z.number(),
  quantidade: z.number().positive({ message: "Quantidade deve ser positiva" })
})

router.get("/", async (req, res) => {
  try {
    const vendas = await prisma.venda.findMany({
      include: {
        usuario: true,
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

  const { usuarioId, produtoId, quantidade } = valida.data

  // pesquisa para validar o usuario (recebe-se apenas id)
  const dadousuario = await prisma.usuario.findUnique({
    where: { id: usuarioId }
  })

  if (!dadousuario) {
    res.status(400).json({ erro: "Erro... Código do usuario inválido" })
    return
  }

  // pesquisa para validar o produto (recebe-se apenas id)
  const dadoProduto = await prisma.produto.findUnique({
    where: { id: produtoId }
  })

  if (!dadoProduto) {
    res.status(400).json({ erro: "Erro... Código do produto inválido" })
    return
  }

  // verifica a quantidade em estoque 
  if (dadoProduto.quantidade < quantidade) {
    res.status(400).json({ erro: `Erro... Tem apenas ${dadoProduto.quantidade} unidades em estoque` })
    return
  }

  // verifica se o usuario tem saldo para fazer esta compra
  if (quantidade * Number(dadoProduto.valor) > Number(dadoUsuario.saldo)) {
    res.status(400).json({ erro: `Erro... Saldo do usuario é de R$: ${dadoUsuario.saldo}` })
    return
  }

  try {
    const [venda, usuario, produto] = await prisma.$transaction([
      prisma.venda.create({
        data: { usuarioId, produtoId, quantidade, valor: Number(dadoProduto.valor) }
      }),
      prisma.usuario.update({
        where: { id: usuarioId },
        data: { saldo: { decrement: quantidade * Number(dadoProduto.valor) } }
      }),
      prisma.produto.update({
        where: { id: produtoId },
        data: { quantidade: { decrement: quantidade } }
      })
    ])
    res.status(201).json({ venda, usuario, produto })
  } catch (error) {
    res.status(400).json({ error })
  }
})

router.delete("/:id", async (req, res) => {
  const { id } = req.params

  try {

    const vendaExcluida = await prisma.venda.findUnique({ where: { id: Number(id) } })

    const [venda, usuario, produto] = await prisma.$transaction([
      prisma.venda.delete({ where: { id: Number(id) } }),
      prisma.usuario.update({
        where: { id: vendaExcluida?.usuarioId },
        data: { saldo: { increment: Number(vendaExcluida?.quantidade) * Number(vendaExcluida?.valor) } }
      }),
      prisma.produto.update({
        where: { id: vendaExcluida?.produtoId },
        data: { quantidade: { increment: Number(vendaExcluida?.quantidade) } }
      })
    ])

    res.status(200).json({ venda, usuario, produto })
  } catch (error) {
    res.status(400).json({ erro: error })
  }
})

export default router
