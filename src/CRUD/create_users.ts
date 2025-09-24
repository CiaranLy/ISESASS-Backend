import { prisma } from "../db"
import { Request, Response } from "express"

export const createUsers = async (req: Request, res: Response) => {
  const { email, name, password, phone } = req.body
  const userResponse = await prisma.users.create({
    data: { email, name, password, phone },
  })
  return userResponse
}