import { prisma } from "../db"
import { Request, Response } from "express"

export const getUser = async (req: Request, res: Response) => {
    const { userId } = req.body
    try {
        const user = await prisma.users.findUnique({
        where: { id: userId },
    })
        return user
    } catch (error: any) {
        if (error.code === 'P2002') {
            return res.status(409).json({ error: 'User not found' })
        }
        return res.status(500).json({ error: 'Internal server error' })
    }
}