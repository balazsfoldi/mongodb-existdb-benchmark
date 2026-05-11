import { generateBooks }
from './generators/generateBooks.js'

import {
  benchmarkInsert,
  benchmarkFind,
  benchmarkFilter,
  benchmarkAggregation,
  benchmarkUpdate,
  benchmarkIndexedFind,
  createIndexes
} from './mongodb/mongoBenchmarks.js'

async function main() {
  const books = generateBooks(10000)

  console.log('=== MongoDB ===')

  const insertTime =
    await benchmarkInsert(books)

  console.log(
    `Insert: ${insertTime.toFixed(2)} ms`
  )

  const findTime =
    await benchmarkFind()

  console.log(
    `Find: ${findTime.toFixed(2)} ms`
  )

  const filterTime =
    await benchmarkFilter()

  console.log(
    `Filter: ${filterTime.toFixed(2)} ms`
  )

  const aggregationTime =
    await benchmarkAggregation()

  console.log(
    `Aggregation: ${aggregationTime.toFixed(2)} ms`
  )

  const updateTime =
    await benchmarkUpdate()

  console.log(
    `Update: ${updateTime.toFixed(2)} ms`
  )

  await createIndexes()

  const indexedFindTime =
    await benchmarkIndexedFind()

  console.log(
    `Indexed find: ${indexedFindTime.toFixed(2)} ms`
  )
}

main()