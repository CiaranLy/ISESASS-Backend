import { PrismaClient } from "../generated/prisma/index.js"
import { Request, Response } from "express"

const prisma = new PrismaClient()

export const createInterestedUser = async (req: Request, res: Response) => {
  try {
    const { postId, userId, userName } = req.body
    const interestedUser = await prisma.postInterest.create({
        data: { postId, userId, userName }
    })
    return res.status(201).json(interestedUser)
  } catch (error: any) {
    return res.status(500).json({ error: 'Internal server error' })
  }
}