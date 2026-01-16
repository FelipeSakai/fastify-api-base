import { app } from '../src/app'
import { resetDataBase } from './helpers'
import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  should,
} from 'vitest'

describe('Notes routes', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  beforeEach(async () => {
    await resetDataBase()
  })

  it('shoul create a note', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/notes',
      payload: { title: 'Test Note', content: 'This is a test note.' },
    })
    expect(response.statusCode).toBe(201)

    const body = response.json()
    expect(body).toHaveProperty('id')
    expect(body.title).toBe('Test Note')
  })
  it('should list notes with pagination', async () => {
    await app.inject({
      method: 'POST',
      url: '/notes',
      payload: { title: 'Note 1' },
    })
    const response = await app.inject({
      method: 'GET',
      url: '/notes?page=1&limit=10',
    })
    expect(response.statusCode).toBe(200)

    const body = response.json()

    expect(body).toHaveProperty('page', 1)
    expect(body).toHaveProperty('limit', 10)
    expect(Array.isArray(body.data)).toBe(true)
    expect(body.data.length).toBe(1)
    expect(body.data[0].title).toBe('Note 1')
  })
  it('should get a note by id', async () => {
    const created = await app.inject({
      method: 'POST',
      url: '/notes',
      payload: { title: 'Note by ID' },
    })
    const createdBody = created.json()
    const id = createdBody.id

    const response = await app.inject({
      method: 'GET',
      url: `/notes/${id}`,
    })

    expect(response.statusCode).toBe(200)
    expect(response.json().id).toBe(id)
  })

  it('should return 404 for non-existent note', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/notes/00000000-0000-0000-0000-000000000000',
    })
    console.log(response.statusCode, response.body)
    expect(response.statusCode).toBe(404)
  })
})
