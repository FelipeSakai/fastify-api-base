import fastify from 'fastify'
import { notesRoutes } from './modules/notes/notes.routes.js'

export const app = fastify({ logger: true })

app.get('/health', async () => ({ status: 'ok' }))

app.register(notesRoutes)
