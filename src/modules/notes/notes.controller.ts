import type { FastifyReply, FastifyRequest } from 'fastify'
import {
  createNoteBodySchema,
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
  const notes = await listNotes()
  return reply.send(notes)
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
