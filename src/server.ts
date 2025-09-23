import express from 'express'

const app = express()
const port = process.env.PORT ? Number(process.env.PORT) : 3000

app.use(express.json())

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' })
})

app.get('/', (_req, res) => {
  res.status(200).send('ISESASS Node.js server is running')
})

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on http://localhost:${port}`)
})


