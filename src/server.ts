import fastify from 'fastify'
import { env } from './env.js'

const app = fastify({ logger: true })

app.get('/health', async () => {
  return { status: 'ok' }
})

app
  .listen({ port: env.PORT, host: '0.0.0.0' })
  .then(() => {
    app.log.info('Server running on port')
  })
  .catch((err) => {
    console.error('Error starting server:', err)
    process.exit(1)
  })
