import 'dotenv/config'
import express from 'express'
import { prisma } from './db'
import { createUsers } from './CRUD/create_users'
import { createPosts } from './CRUD/create_posts'
import { login } from './CRUD/login'

const app = express()
const port = process.env.PORT ? Number(process.env.PORT) : 3000

app.use(express.json())
app.post('/users', createUsers)
app.post('/posts', createPosts)
app.post('/login', login)

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

app.get('/', (_req, res) => {
  res.status(200).send('ISESASS Node.js server is running')
})