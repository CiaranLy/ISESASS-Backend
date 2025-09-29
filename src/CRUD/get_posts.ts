import { PrismaClient } from "../generated/prisma/index.js"
import { Request, Response } from "express"

const prisma = new PrismaClient()

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await prisma.posts.findMany({
      select: {
        id: true,
        price: true,
        semester: true,
        bed: true,
        bathroom: true,
        ensuite: true,
        roommates: true,
        notes: true,
        poster: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true
          }
        },
        location: {
          select: {
            line_1: true,
            line_2: true,
            line_3: true,
            city: true,
            county: true,
            eircode: true
          }
        }
      }
    })
    res.status(200).json({ posts: posts })
  } catch (error: any) {
    return res.status(500).json({ error: 'Internal server error' })
  }
}