import { PrismaClient } from "../generated/prisma/index.js"
import { Request, Response } from "express"

const prisma = new PrismaClient()

export const createPosts = async (req: Request, res: Response) => {
  console.log(req.body)
  try {
    const { posterId, price, semester, bed, bathroom, ensuite, roommates, notes, line_1, line_2, line_3, city, county, eircode } = req.body
    const postResponse = await prisma.posts.create({
        data: { poster: { connect: { id: posterId } }, price, semester, bed, bathroom, ensuite, roommates, notes, location: { create: { line_1, line_2, line_3, city, county, eircode } } },
    })
    return res.status(201).json(postResponse)
  } catch (error: any) {
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'Post already exists' })
    }
    return res.status(500).json({ error: 'Internal server error' })
  }
}