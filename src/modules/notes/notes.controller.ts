import type { FastifyReply, FastifyRequest } from 'fastify'
import {
  createNoteBodySchema,
  listNotesQuerySchema,
  noteIdParamSchema,
  updateNoteBodySchema,
} from './notes.schema.js'
import {
  createNote,
  deleteNote,
  getNoteById,
  listNotes,
  updateNote,
} from './notes.service.js'
import { registerHooks } from 'node:module'

export async function createNoteController(
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
  const { page, limit } = listNotesQuerySchema.parse(request.query)
  const notes = await listNotes(page, limit)
  return reply.send({ page, limit, data: notes })
}

export async function updateNoteController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { id } = noteIdParamSchema.parse(request.params)
  const body = updateNoteBodySchema.parse(request.body)
  const updated = await updateNote(id, body)

  return reply.send(updated)
}

export async function getNoteByIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { id } = noteIdParamSchema.parse(request.params)

  const note = await getNoteById(id)
  if (!note) return reply.code(404).send({ message: 'Note not found' })

  return reply.send(note)
}


export async function deleteController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { id } = noteIdParamSchema.parse(request.params)

  const deleted = await deleteNote(id)

  return reply.code(204).send()
}
