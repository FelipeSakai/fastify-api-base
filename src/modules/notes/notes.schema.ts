import { z } from 'zod'

export const createNoteBodySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().optional(),
})

export const noteSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  content: z.string().nullable().optional(),
  createdAt: z.coerce.date(),
})

export const noteIdParamSchema = z.object({
  id: z.uuid(),
})

export const updateNoteBodySchema = z
  .object({
    title: z.string().min(1).optional(),
    content: z.string().min(1).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field (title or content) must be provided',
  })

export const listNotesQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(10),
})
