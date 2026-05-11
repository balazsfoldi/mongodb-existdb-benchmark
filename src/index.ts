import { generateBooks }
from './generators/generateBooks.js'

import {
  benchmarkInsert,
  benchmarkFind,
  benchmarkFilter,
  benchmarkAggregation,
  benchmarkUpdate,
  benchmarkIndexedFind,
  clearMongoDatabase
} from './mongodb/mongoBenchmarks.js'

import {
  benchmarkExistInsert,
  benchmarkExistFind,
  benchmarkExistFilter,
  benchmarkExistAggregation,
  benchmarkExistUpdate,
  clearExistDatabase
} from './existdb/existBenchmarks.js'

import {
  runBenchmark,
  exportResultsToCsv,
  BenchmarkResult
} from './benchmarks/benchmarkRunner.js'

async function main() {
  const datasetSize = Number(
    process.argv[2]
  ) || 1000

  console.log(
    `Dataset size: ${datasetSize}`
  )

  const books =
    generateBooks(datasetSize)

  console.log(
    `Generated ${books.length} books`
  )

  const allResults: BenchmarkResult[] = []

  const RUNS = 5

  console.log('\n=== MongoDB ===\n')

  await clearMongoDatabase()

  await benchmarkInsert(books)

  const mongoInsert = await runBenchmark(
    'MongoDB',
    'Insert',
    RUNS,
    async () => benchmarkInsert(books)
  )

  allResults.push(...mongoInsert.rawResults)

  console.log(
    `Average: ${mongoInsert.stats.average.toFixed(2)} ms`
  )

  const mongoFind = await runBenchmark(
    'MongoDB',
    'Find',
    RUNS,
    benchmarkFind
  )

  allResults.push(...mongoFind.rawResults)

  console.log(
    `Average: ${mongoFind.stats.average.toFixed(2)} ms`
  )

  const mongoFilter = await runBenchmark(
    'MongoDB',
    'Filter',
    RUNS,
    benchmarkFilter
  )

  allResults.push(...mongoFilter.rawResults)

  console.log(
    `Average: ${mongoFilter.stats.average.toFixed(2)} ms`
  )

  const mongoAggregation = await runBenchmark(
    'MongoDB',
    'Aggregation',
    RUNS,
    benchmarkAggregation
  )

  allResults.push(...mongoAggregation.rawResults)

  console.log(
    `Average: ${mongoAggregation.stats.average.toFixed(2)} ms`
  )

  const mongoUpdate = await runBenchmark(
    'MongoDB',
    'Update',
    RUNS,
    benchmarkUpdate
  )

  allResults.push(...mongoUpdate.rawResults)

  console.log(
    `Average: ${mongoUpdate.stats.average.toFixed(2)} ms`
  )

  const mongoIndexedFind = await runBenchmark(
    'MongoDB',
    'Indexed Find',
    RUNS,
    benchmarkIndexedFind
  )

  allResults.push(...mongoIndexedFind.rawResults)

  console.log(
    `Average: ${mongoIndexedFind.stats.average.toFixed(2)} ms`
  )

  console.log('\n=== eXistDB ===\n')

  await clearExistDatabase()

  const existInsert = await runBenchmark(
    'eXistDB',
    'Insert',
    RUNS,
    async () => benchmarkExistInsert(books)
  )

  allResults.push(...existInsert.rawResults)

  console.log(
    `Average: ${existInsert.stats.average.toFixed(2)} ms`
  )

  const existFind = await runBenchmark(
    'eXistDB',
    'Find',
    RUNS,
    benchmarkExistFind
  )

  allResults.push(...existFind.rawResults)

  console.log(
    `Average: ${existFind.stats.average.toFixed(2)} ms`
  )

  const existFilter = await runBenchmark(
    'eXistDB',
    'Filter',
    RUNS,
    benchmarkExistFilter
  )

  allResults.push(...existFilter.rawResults)

  console.log(
    `Average: ${existFilter.stats.average.toFixed(2)} ms`
  )

  const existAggregation = await runBenchmark(
    'eXistDB',
    'Aggregation',
    RUNS,
    benchmarkExistAggregation
  )

  allResults.push(...existAggregation.rawResults)

  console.log(
    `Average: ${existAggregation.stats.average.toFixed(2)} ms`
  )

  const existUpdate = await runBenchmark(
    'eXistDB',
    'Update',
    RUNS,
    benchmarkExistUpdate
  )

  allResults.push(...existUpdate.rawResults)

  console.log(
    `Average: ${existUpdate.stats.average.toFixed(2)} ms`
  )

  await exportResultsToCsv(allResults)
}

main()