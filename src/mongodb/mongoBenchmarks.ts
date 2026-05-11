import { performance } from 'node:perf_hooks'

import { Book } from '../models/Book.js'
import { getCollection } from './mongoClient.js'

export async function benchmarkInsert(
  books: Book[]
) {
  const collection = await getCollection()

  await collection.deleteMany({})

  const start = performance.now()

  await collection.insertMany(books)

  const end = performance.now()

  return end - start
}