import { prisma } from "../db"
import { Request, Response } from "express"

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
            name: true,
            email: true,
            phone: true
          }
        },
        location: {
          select: {
            line_1: true,
            line_2: true,
            town: true,
            city: true,
            county: true,
            eircode: true
          }
        }
      }
    })
    res.status(200).json(posts)
  } catch (error: any) {
    return res.status(500).json({ error: 'Internal server error' })
  }
}