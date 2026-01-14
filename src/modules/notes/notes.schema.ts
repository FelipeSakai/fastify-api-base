import { z } from 'zod'

export const createNoteBodySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().optional(),
})

export const noteSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  content: z.string().nullable().optional(),
  createdAt: z.coerce.date(),
})
