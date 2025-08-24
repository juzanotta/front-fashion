import { PrismaClient } from "@prisma/client"
import { Router } from "express"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

const prisma = new PrismaClient()

const router = Router()

router.post("/", async (req, res) => {
  const { email, senha } = req.body

  const mensagemPadrao = "Email ou senha incorretos"

  if (!email || !senha) {
    res.status(400).json({ erro: mensagemPadrao })
    return
  }

  try {
    const usuario = await prisma.usuario.findFirst({
      where: { email }
    })

    if (usuario == null) {
      res.status(400).json({ erro: mensagemPadrao })
      return
    }

    if (bcrypt.compareSync(senha, usuario.senha)) {

      const token = jwt.sign({
        userLogadoId: usuario.id,
        userLogadoNome: usuario.nome
      },
        process.env.JWT_KEY as string,
        { expiresIn: "1h" }
      )

      res.status(200).json({
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        token
      })
    } else {

      const descricao = "Tentativa de acesso ao sistema"
      const complemento = "Usuário: " + usuario.id + " - " + usuario.nome

      const log = await prisma.log.create({
        data: { descricao, complemento, usuarioId: usuario.id }
      })

      res.status(400).json({ erro: mensagemPadrao })
    }
  } catch (error) {
    res.status(400).json(error)
  }
})

export default router