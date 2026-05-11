import { createObjectCsvWriter } from 'csv-writer'

export type BenchmarkResult = {
  database: string
  operation: string
  run: number
  duration: number
}

export type BenchmarkStats = {
  average: number
  min: number
  max: number
}

export async function runBenchmark(
  database: string,
  operation: string,
  runs: number,
  benchmarkFn: () => Promise<number>
): Promise<{
  rawResults: BenchmarkResult[]
  stats: BenchmarkStats
}> {
  const rawResults: BenchmarkResult[] = []

  for (let i = 1; i <= runs; i++) {
    console.log(
      `[${database}] ${operation} run ${i}/${runs}`
    )

    const duration = await benchmarkFn()

    rawResults.push({
      database,
      operation,
      run: i,
      duration
    })
  }

  const durations = rawResults.map(r => r.duration)

  const average =
    durations.reduce((a, b) => a + b, 0) /
    durations.length

  const min = Math.min(...durations)

  const max = Math.max(...durations)

  return {
    rawResults,
    stats: {
      average,
      min,
      max
    }
  }
}

export async function exportResultsToCsv(
  results: BenchmarkResult[]
) {
  const csvWriter = createObjectCsvWriter({
    path: 'benchmark-results.csv',
    header: [
      {
        id: 'database',
        title: 'DATABASE'
      },
      {
        id: 'operation',
        title: 'OPERATION'
      },
      {
        id: 'run',
        title: 'RUN'
      },
      {
        id: 'duration',
        title: 'DURATION'
      }
    ]
  })

  await csvWriter.writeRecords(results)
}