import type { FastifyInstance } from 'fastify'
import { createNoteHandler, listNotesController } from './notes.controller.js'

export async function notesRoutes(app: FastifyInstance) {
  app.post('/notes', createNoteHandler)
  app.get('/notes', listNotesController)
}
