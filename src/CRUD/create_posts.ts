import { prisma } from "../db"
import { Request, Response } from "express"

export const createPosts = async (req: Request, res: Response) => {
  const { posterId, price, semester, bed, bathroom, ensuite, roommates, notes, locationId, line_1, line_2, town, city, county, eircode } = req.body
  const postResponse = await prisma.posts.create({
    data: { posterId, price, semester, bed, bathroom, ensuite, roommates, notes, locationId },
  })
  const addressResponse = await prisma.locations.create({
    data: { post: { connect: { id: postResponse.id } }, line_1, line_2, town, city, county, eircode },
  })
  return postResponse
}