import { performance } from 'node:perf_hooks'

import { Book } from '../models/Book.js'
import { getBooksCollection }
from './mongoClient.js'

export async function benchmarkInsert(
  books: Book[]
) {
  const collection =
    await getBooksCollection()

  await collection.deleteMany({})

  const start = performance.now()

  await collection.insertMany(books)

  const end = performance.now()

  return end - start
}

export async function benchmarkFind() {
  const collection =
    await getBooksCollection()

  const start = performance.now()

  await collection.findOne({
    title: 'Book 999'
  })

  const end = performance.now()

  return end - start
}

export async function benchmarkFilter() {
  const collection =
    await getBooksCollection()

  const start = performance.now()

  await collection.find({
    category: 'Sci-Fi'
  }).toArray()

  const end = performance.now()

  return end - start
}

export async function benchmarkAggregation() {
  const collection =
    await getBooksCollection()

  const start = performance.now()

  await collection.aggregate([
    {
      $group: {
        _id: null,
        avgPrice: {
          $avg: '$price'
        }
      }
    }
  ]).toArray()

  const end = performance.now()

  return end - start
}

export async function benchmarkUpdate() {
  const collection =
    await getBooksCollection()

  const start = performance.now()

  await collection.updateMany(
    {
      category: 'Sci-Fi'
    },
    {
      $mul: {
        price: 1.1
      }
    }
  )

  const end = performance.now()

  return end - start
}

export async function createIndexes() {
  const collection =
    await getBooksCollection()

  await collection.createIndex({
    title: 1
  })

  await collection.createIndex({
    category: 1
  })
}

export async function benchmarkIndexedFind() {
  const collection =
    await getBooksCollection()

  const start = performance.now()

  await collection.findOne({
    title: 'Book 9999'
  })

  const end = performance.now()

  return end - start
}