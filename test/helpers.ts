import { db } from '../src/db/index'
import { notes } from '../src/db/schema'

export async function resetDataBase() {
  await db.delete(notes)
}
