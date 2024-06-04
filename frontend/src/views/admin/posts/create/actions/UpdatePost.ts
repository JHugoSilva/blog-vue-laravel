import { APP } from '../../../../../shared/App'
import { verifyToken } from '../../../../../helper/verifyToken'
import { IUpdatePostInput } from '../types/update'

export type PostResponseType = {
  message: string
}

const updatePost = async (input: any, res: any, rej: any) => {
  const { headers } = verifyToken()
  const response = await fetch(`${APP.apiUrl}/post/${input.id}`, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify(input)
  })

  const data = await response.json()

  if (!response.ok) {
    rej(data)
  }

  res(data)
}

export async function updatePostHttp(input: IUpdatePostInput) {
  return new Promise<PostResponseType>((resolve, reject) => {
    updatePost(input, resolve, reject)
  })
}
