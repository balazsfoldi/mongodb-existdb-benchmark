import { generateBooks }
from './generators/generateBooks.js'

import { benchmarkInsert }
from './mongodb/mongoBenchmarks.js'

async function main() {
  const books = generateBooks(10000)

  const time =
    await benchmarkInsert(books)

  console.log(
    `Mongo insert: ${time.toFixed(2)} ms`
  )
}

main()