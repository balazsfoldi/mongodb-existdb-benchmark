import { MongoClient } from 'mongodb'

const client = new MongoClient(
  'mongodb://localhost:27017'
)

export async function getBooksCollection() {
  await client.connect()

  const db = client.db('benchmark')

  return db.collection('books')
}