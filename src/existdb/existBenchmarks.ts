import { performance }
from 'node:perf_hooks'

import { Book }
from '../models/Book.js'

import { existClient }
from './existClient.js'

import { bookToXml }
from './bookToXml.js'
import { executeQuery } from './query.js'

export async function benchmarkExistInsert(
  books: Book[]
) {
  const start = performance.now()

  for (const book of books) {
    await existClient.put(
      `/books/${book.id}.xml`,
      bookToXml(book),
      {
        headers: {
          'Content-Type':
            'application/xml'
        }
      }
    )
  }

  const end = performance.now()

  return end - start
}

export async function benchmarkExistFind() {
   const query = `
        avg(
        for $b in collection("/db/books")//book
        return xs:decimal($b/price)
        )`

  const start = performance.now()

  await executeQuery(query)

  const end = performance.now()

  return end - start
}

export async function benchmarkExistFilter() {
  const query = `collection("/db/books")//book[
      category = "Sci-Fi"
    ]
  `

  const start = performance.now()

  await executeQuery(query)

  const end = performance.now()

  return end - start
}

export async function benchmarkExistAggregation() {
  const query = `avg(
      collection("/db/books")
      //book/price/xs:decimal(.)
    )
  `

  const start = performance.now()

  await executeQuery(query)

  const end = performance.now()

  return end - start
}

export async function benchmarkExistUpdate() {
  const query = `for $book in
      collection("/db/books")//book[
        category = "Sci-Fi"
      ]

    return
      update value
      $book/price
      with
      xs:decimal($book/price) * 1.1
  `

  const start = performance.now()

  await executeQuery(query)

  const end = performance.now()

  return end - start
}

export async function clearExistDatabase() {
    console.log('Clearing eXistDB...')
    const query = `
        for $doc in collection("/db/books")
        return xmldb:remove(
        "/db/books",
        util:document-name($doc)
        )
        `

  await executeQuery(query)
}