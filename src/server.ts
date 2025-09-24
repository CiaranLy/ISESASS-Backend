import 'dotenv/config'
import express from 'express'
import { prisma } from './db'
import { createUsers } from './CRUD/create_users'
import { createPosts } from './CRUD/create_posts'

const app = express()
const port = process.env.PORT ? Number(process.env.PORT) : 3000

app.use(express.json())

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

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on http://localhost:${port}`)
})

app.post('/users', async (req, res) => {
  const user = await createUsers(req, res)
  res.status(201).json(user)
})

app.post('/posts', async (req, res) => {
  const post = await createPosts(req, res)
  res.status(201).json(post)
})
