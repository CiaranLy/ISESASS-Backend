import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"


const prisma = new PrismaClient

export const updatePosts = async (req: Request, res: Response ) => {
    try{
        const { id, posterId, price, semester, bed, bathroom, ensuite, roommates, notes, line_1, line_2, line_3, city, county, eircode } = req.body
        const postResponse = await prisma.posts.update({
            where: { id: parseInt(id) },
            data: { 
                poster: { connect: { id: parseInt(posterId) } }, 
                price, 
                semester, 
                bed, 
                bathroom, 
                ensuite, 
                roommates, 
                notes, 
                location: { 
                    update: { 
                        line_1, 
                        line_2, 
                        line_3, 
                        city, 
                        county, 
                        eircode 
                    } 
                } 
            },
        })
        res.status(200).json(postResponse)
    } catch (error) {
        res.status(500).json({ error: 'Failed to update post' })
    }
}