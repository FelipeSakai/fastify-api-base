import type { FastifyInstance } from 'fastify'
import {
  createNoteController,
  deleteController,
  getNoteByIdController,
  listNotesController,
  updateNoteController,
} from './notes.controller.js'

export async function notesRoutes(app: FastifyInstance) {
  app.post('/notes', createNoteController)
  app.get('/notes', listNotesController)

  app.get('/notes/:id', getNoteByIdController)
  app.put('/notes/:id', updateNoteController)
  app.delete('/notes/:id', deleteController)
}
