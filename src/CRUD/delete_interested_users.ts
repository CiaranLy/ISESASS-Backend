import { PrismaClient } from "../generated/prisma/index.js"
import { Request, Response } from "express"

const prisma = new PrismaClient()

export const deleteInterestedUsers = async (req: Request, res: Response) => {
  try {
    const { postId, userId } = req.body
    const interestedUser = await prisma.postInterest.delete({
      where: { postId_userId: { postId, userId } }
    })
    return res.status(200).json(interestedUser)
  } catch (error: any) {
    if (error.code === 'P2025') {
        return res.status(404).json({ error: 'Interested user not found' })
    }
    return res.status(500).json({ error: 'Internal server error' })
  }
}