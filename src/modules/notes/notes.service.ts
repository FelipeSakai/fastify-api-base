import { desc } from 'drizzle-orm'
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

export async function listNotes(){
    const rows = await db
    .select()
    .from(notes)
    .orderBy(desc(notes.createdAt))

  return rows
}