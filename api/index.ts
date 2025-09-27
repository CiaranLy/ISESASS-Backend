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

// CORS headers - MUST be first
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  
  next()
})

app.use(express.json())

// Health checks
app.get('/health', (_req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.status(200).json({ status: 'ok' })
})

// Test CORS endpoint
app.get('/test-cors', (_req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
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

// API routes with explicit CORS headers
app.options('/users', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.status(200).end()
})
app.post('/login', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  login(req, res)
})
app.post('/users', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  createUsers(req, res)
})
app.get('/user', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  getUser(req, res)
})
app.delete('/user', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  deleteUser(req, res)
})
app.post('/posts', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  createPosts(req, res)
})
app.get('/posts', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  getPosts(req, res)
})
app.delete('/posts', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  deletePosts(req, res)
})

app.get('/', (_req, res) => {
  res.status(200).send('ISESASS Node.js server is running')
})

export default app
