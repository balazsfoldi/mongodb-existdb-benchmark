import { Book } from '../models/Book.js'

export function bookToXml(
  book: Book
) {
  return `
    <book>
      <id>${book.id}</id>
      <title>${book.title}</title>
      <author>${book.author}</author>
      <category>${book.category}</category>
      <year>${book.year}</year>
      <price>${book.price}</price>
    </book>
  `
}