import 'dotenv/config'
import express from 'express'
import { PrismaClient } from '../src/generated/prisma/index.js'
import { createUsers } from '../src/CRUD/create_users.js'
import { createPosts } from '../src/CRUD/create_posts.js'
import { login } from '../src/CRUD/login.js'
import { getPosts } from '../src/CRUD/get_posts.js'
import { getUser } from '../src/CRUD/get_user.js'
import { deleteUser } from '../src/CRUD/delete_user.js'
import { deletePosts } from '../src/CRUD/delete_posts.js'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())

// Health checks
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' })
})

app.get('/db/health', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`
    res.status(200).json({ database: 'ok' })
  } catch (error) {
    res.status(500).json({ database: 'error', error: (error as Error).message })
  }
})

// API routes
app.post('/login', login)
app.post('/users', createUsers)
app.get('/user', getUser)
app.delete('/user', deleteUser)
app.post('/posts', createPosts)
app.get('/posts', getPosts)
app.delete('/posts', deletePosts)

app.get('/', (_req, res) => {
  res.status(200).send('ISESASS Node.js server is running')
})

export default app
