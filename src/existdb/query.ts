import { existClient }
from './existClient.js'

export async function executeQuery(
  query: string
) {
  const response =
    await existClient.get('', {
      params: {
        _query: query
      }
    })

  return response.data
}