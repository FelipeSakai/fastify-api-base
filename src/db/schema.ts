import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const notes = pgTable('notes', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  content: text('content'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})
