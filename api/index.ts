import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { PrismaClient } from '../src/generated/prisma/index.ts'
import { createUsers } from '../src/CRUD/create_users.ts'
import { createPosts } from '../src/CRUD/create_posts.ts'
import { login } from '../src/CRUD/login.ts'
import { getPosts } from '../src/CRUD/get_posts.ts'
import { getUser } from '../src/CRUD/get_user.ts'
import { deleteUser } from '../src/CRUD/delete_user.ts'
import { deletePosts } from '../src/CRUD/delete_posts.ts'
import { updatePosts } from '../src/CRUD/update_posts.ts'
import { createInterestedUser } from '../src/CRUD/create_interested_user.ts'
import { deleteInterestedUsers } from '../src/CRUD/delete_interested_users.ts'

const prisma = new PrismaClient()

const app = express()

// Proper CORS configuration
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001', 
    'https://isesass.vercel.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
}))

app.use(express.json())

// Health checks
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', schema: 'updated', version: '2.0' })
})

// Test CORS endpoint
app.get('/test-cors', (_req, res) => {
  res.status(200).json({ message: 'CORS test successful', timestamp: new Date().toISOString() })
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
app.put('/posts', updatePosts)
app.post('/interested-users', createInterestedUser)
app.delete('/interested-users', deleteInterestedUsers)

app.get('/', (_req, res) => {
  res.status(200).send('ISESASS Node.js server is running')
})

export default app
