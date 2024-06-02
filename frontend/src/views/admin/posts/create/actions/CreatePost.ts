import { APP } from '../../../../../shared/App'
import { ICreatePostInput } from '../../../types/admin-types'
import { verifyToken } from '../../../../../helper/verifyToken'

export type PostResponseType = {
  message: string
}

const createPost = async (input: any, res: any, rej: any) => {
  const { headers } = verifyToken()
  const response = await fetch(`${APP.apiUrl}/post`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(input)
  })

  const data = await response.json()

  if (!response.ok) {
    rej(data)
  }

  res(data)
}

export async function createPostHttp(input: ICreatePostInput) {
  return new Promise<PostResponseType>((resolve, reject) => {
    createPost(input, resolve, reject)
  })
}
