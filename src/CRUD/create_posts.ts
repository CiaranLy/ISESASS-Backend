import { prisma } from "../db"
import { Request, Response } from "express"

export const createPosts = async (req: Request, res: Response) => {
  const { posterId, price, semester, bed, bathroom, ensuite, roommates, notes, locationId } = req.body
  const postResponse = await prisma.posts.create({
    data: { posterId, price, semester, bed, bathroom, ensuite, roommates, notes, locationId },
  })
  return postResponse
}