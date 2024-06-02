import { verifyToken } from '../../../../../helper/verifyToken'
import { APP } from '../../../../../shared/App'
import { IPostList } from '../types/PostList-type'

export type getResponseType = {
  data: Array<IPostList>
} & Record<string, string | number>

const getPost = async (page: any, query: any, res: any, rej: any) => {
  const { headers } = verifyToken()
  const response = await fetch(`${APP.apiUrl}/posts?page=${page}&query=${query}`, {
    method: 'GET',
    headers: headers
  })

  const data = await response.json()

  if (!response.ok) {
    rej(data)
  }

  res(data)
}

export async function getPostHttp(page: number, query: string) {
  return new Promise<getResponseType>((resolve, reject) => {
    getPost(page, query, resolve, reject)
  })
}
