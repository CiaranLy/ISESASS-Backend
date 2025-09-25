import { PrismaClient } from "../generated/prisma/index.js"
import { Request, Response } from "express"

const prisma = new PrismaClient()

export const deletePosts = async (req: Request, res: Response) => {
    const { postId } = req.body
    try {
        const post = await prisma.posts.delete({
            where: { id: postId }
        })
        return res.status(200).json({ message: 'Post deleted successfully' })
    } catch (error: any) {
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Post not found' })
        }
        return res.status(500).json({ error: 'Internal server error' })
    }
}