import { v4 as uuid } from 'uuid'
import { Book } from '../models/Book.js'

const categories = [
  'Fantasy',
  'Sci-Fi',
  'Programming',
  'History',
  'Drama'
]

export function generateBooks(
  count: number
): Book[] {
  return Array.from(
    { length: count },
    (_, i) => ({
      id: uuid(),
      title: `Book ${i}`,
      author: `Author ${i % 100}`,
      category: categories[i % categories.length]!,
      year: 1980 + (i % 40),
      price: Number(
        (10 + Math.random() * 90).toFixed(2)
      )
    })
  )
}