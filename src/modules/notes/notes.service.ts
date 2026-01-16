import { desc, eq } from 'drizzle-orm'
import { db } from '../../db/index.js'
import { notes } from '../../db/schema.js'

type CreateNoteInput = {
  title: string
  content?: string
}

export async function createNote(input: CreateNoteInput) {
  const [created] = await db
    .insert(notes)
    .values({
      title: input.title,
      content: input.content ?? null,
    })
    .returning()

  return created
}

export async function listNotes(page: number, limit: number) {
  const offset = (page - 1) * limit
  const rows = await db
    .select()
    .from(notes)
    .orderBy(desc(notes.createdAt))
    .limit(limit)
    .offset(offset)

  return rows
}

export async function getNoteById(id: string) {
  const rows = await db.select().from(notes).where(eq(notes.id, id)).limit(1)

  if (!rows) {
    throw new Error('Note not found')
  }
  return rows[0] ?? null
}

export async function deleteNote(id: string) {
  const [deleted] = await db.delete(notes).where(eq(notes.id, id)).returning()

  return deleted ?? null
}

export async function updateNote(
  id: string,
  data: { title?: string; content?: string },
) {
  const [updated] = await db
    .update(notes)
    .set({
      title: data.title,
      content: data.content,
    })
    .where(eq(notes.id, id))
    .returning()

  return updated ?? null
}
