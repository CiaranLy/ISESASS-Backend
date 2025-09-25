import { prisma } from "../db"
import { Request, Response } from "express"

export const getUser = async (req: Request, res: Response) => {
    const { userId } = req.body
    try {
        const user = await prisma.users.findUnique({
        where: { id: userId },
    })
        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }
        return res.status(200).json(user)
    } catch (error: any) {
        return res.status(500).json({ error: 'Internal server error' })
    }
}