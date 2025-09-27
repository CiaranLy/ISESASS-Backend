import { PrismaClient } from "../generated/prisma/index.js"
import { Request, Response } from "express"

const prisma = new PrismaClient()

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  let user = await prisma.users.findFirst({ where: { email } })
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' })
  }
  if (user.password !== password) {
    return res.status(401).json({ error: 'Invalid password' })
  }

  const userData = {
    id: user.id,
    email: user.email,
    name: user.name,
    createdAt: user.createdAt,
    phone: user.phone,
  }
  return res.status(200).json({ message: 'Login successful', user: userData })
}