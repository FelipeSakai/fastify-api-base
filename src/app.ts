import fastify from 'fastify'
import { notesRoutes } from './modules/notes/notes.routes.js'

export const app = fastify({ logger: false })

app.get('/health', async () => ({ status: 'ok' }))

app.register(notesRoutes)
