import { PrismaClient } from "../generated/prisma/index.js"
import { Request, Response } from "express"

const prisma = new PrismaClient()

export const getUser = async (req: Request, res: Response) => {
    const { userId } = req.body
    try {
        const user = await prisma.users.findUnique({
        where: { id: userId },
    })
        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }
        const userData = {
            id: user.id,
            email: user.email,
            name: user.name,
            createdAt: user.createdAt,
            phone: user.phone,
        }
        return res.status(200).json(userData)
    } catch (error: any) {
        return res.status(500).json({ error: 'Internal server error' })
    }
}