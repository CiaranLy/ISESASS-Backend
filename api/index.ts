import 'dotenv/config'
import express from 'express'
import cors from 'cors'
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

// Manual CORS headers - more reliable for Vercel
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  
  next()
})

// CORS configuration (backup)
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

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
