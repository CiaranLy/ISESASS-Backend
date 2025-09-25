import { PrismaClient } from "../generated/prisma/index.js"
import { Request, Response } from "express"

const prisma = new PrismaClient()

export const createUsers = async (req: Request, res: Response) => {
  try {
    const { email, name, password, phone } = req.body
    const userResponse = await prisma.users.create({
        data: { email, name, password, phone },
    })
    return res.status(201).json(userResponse)
  } catch (error: any) {
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'Email already exists' })
    }
    return res.status(500).json({ error: 'Internal server error' })
  }
}