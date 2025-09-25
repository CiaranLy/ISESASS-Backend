import { prisma } from "../db"
import { Request, Response } from "express"

export const deleteUser = async (req: Request, res: Response) => {
    const { userId } = req.body
    try {
        const user = await prisma.users.delete({
            where: { id: userId }
        })
        return res.status(200).json({ message: 'User deleted successfully' })
    } catch (error: any) {
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'User not found' })
        }
        return res.status(500).json({ error: 'Internal server error' })
    }
}