import type { FastifyReply, FastifyRequest } from 'fastify'
import { createNoteBodySchema } from './notes.schema.js'
import { createNote, listNotes } from './notes.service.js'

export async function createNoteHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const body = createNoteBodySchema.parse(request.body)

  const created = await createNote(body)

  return reply.status(201).send(created)
}

export async function listNotesController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const notes = await listNotes()
  return reply.send(notes)
}
