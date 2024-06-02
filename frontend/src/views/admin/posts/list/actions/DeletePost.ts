import { verifyToken } from '../../../../../helper/verifyToken'
import { APP } from '../../../../../shared/App'

export type deleteRespnseType = {
  message: string
}

const deletPost = async (postId: number, res: any, rej: any) => {
  const { headers } = verifyToken()
  const response = await fetch(`${APP.apiUrl}/post/${postId}`, {
    method: 'DELETE',
    headers: headers
  })

  const data = await response.json()

  if (!response.ok) {
    rej(data)
  }

  res(data)
}

export async function deletePostHttp(postId: number) {
  return new Promise<deleteRespnseType>((resolve, reject) => {
    deletPost(postId, resolve, reject)
  })
}
