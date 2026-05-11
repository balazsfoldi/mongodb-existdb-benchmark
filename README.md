# MongoDB vs eXistDB Benchmark

Performance comparison project between MongoDB and eXistDB databases using TypeScript.

## Project Goal

The goal of this project is to compare the performance characteristics of two different NoSQL database systems:

- MongoDB (document-oriented database)
- eXistDB (native XML database)

The benchmark measures execution times of common database operations on the same dataset.

## Technologies

- Node.js
- TypeScript
- MongoDB
- eXistDB
- Docker

## Tested Operations

- Bulk insert
- Find by title
- Category filtering
- Aggregation
- Update operations

## Dataset

The project generates synthetic book records with the following structure:

```ts
type Book = {
  id: string
  title: string
  author: string
  category: string
  year: number
  price: number
}
```

## Project Structure

```text
src/
├── generators/
│   └── generateBooks.ts
│
├── models/
│   └── Book.ts
│
├── mongodb/
│   ├── mongoClient.ts
│   └── mongoBenchmarks.ts
│
├── existdb/
│   ├── existClient.ts
│   └── existBenchmarks.ts
│
├── benchmarks/
│   ├── benchmark.ts
│   └── benchmarkRunner.ts
│
├── utils/
│   └── timer.ts
│
└── index.ts
```

## Setup

### Start databases

```bash
docker compose up -d
```

### Install dependencies

```bash
npm install
```

### Run benchmarks

```bash
npm run dev
```

## Benchmark Metrics

The following metrics are measured:

- Execution time (ms)
- Query response time
- Insert performance

## Expected Results

MongoDB is expected to perform better in:

- bulk insert operations
- document retrieval
- aggregations

eXistDB is expected to provide:

- strong XML querying capabilities
- native XML document handling

## Author

University assignment for Modern Database Systems (2026)
