import { PrismaClient, Tamanhos, Tipos } from '@prisma/client'
import { Router } from 'express'
import { z } from 'zod'

const prisma = new PrismaClient()

const router = Router()

const produtoSchema = z.object({
  cor: z.string().min(4,
    { message: "Nome da cor deve possuir, no mínimo, 4 caracteres"}),
  marca: z.string().min(2,
    { message: "Nome da marca deve possuir, no mínimo, 2 caracteres"}).optional(),
  material: z.string().min(2,
    { message: "Nome do material deve possuir, no mínimo, 2 caracteres"}).optional(),
  valor: z.number().positive({ message: "Valor deve ser um valor positivo"}),
  foto: z.string(),
  favorito: z.boolean().optional(),
  tamanho: z.nativeEnum(Tamanhos),
  tipo: z.nativeEnum(Tipos),
  quantidade: z.number().positive(),
  vendedorId: z.number()
})

router.get("/", async (req, res) => {
  try {
    const produtos = await prisma.produto.findMany()
    res.status(200).json(produtos)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

router.post("/", async (req, res) => {

  const valida = produtoSchema.safeParse(req.body)
  if (!valida.success) {
    res.status(400).json({ erro: valida.error })
    return
  }

  const { cor, valor, foto, tamanho, tipo, vendedorId, quantidade } = valida.data

  try {
    const produto = await prisma.produto.create({
      data: { cor, valor, foto, tamanho, tipo, vendedorId, quantidade}
    })
    res.status(201).json(produto)
  } catch (error) {
    res.status(400).json({ error })
  }
})

router.delete("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const produto = await prisma.produto.delete({
      where: { id: Number(id) }
    })
    res.status(200).json(produto)
  } catch (error) {
    res.status(400).json({ erro: error })
  }
})

router.put("/:id", async (req, res) => {
  const { id } = req.params

  const valida = produtoSchema.safeParse(req.body)
  if (!valida.success) {
    res.status(400).json({ erro: valida.error })
    return
  }

  const { cor, valor, foto, tamanho, tipo, vendedorId, quantidade } = valida.data

  try {
    const produto = await prisma.produto.update({
      where: { id: Number(id) },
      data: { cor, valor, foto, tamanho, tipo, vendedorId, quantidade }
    })
    res.status(200).json(produto)
  } catch (error) {
    res.status(400).json({ error })
  }
})

export default router
