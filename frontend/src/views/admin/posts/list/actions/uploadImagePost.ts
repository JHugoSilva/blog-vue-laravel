import { verifyToken } from '../../../../../helper/verifyToken'
import { APP } from '../../../../../shared/App'

export type uploadResponseType = {
  message: string
}

const uploadImagePost = async (file: any, postId: number, res: any, rej: any) => {
  const { headers } = verifyToken()
  const headersAppend = new Headers()
  headersAppend.append('Authorization', 'Bearer ' + headers?.Authorization)
  const formData = new FormData()
  formData.append('image', file)
  formData.append('post_id', postId.toString())
  const response = await fetch(`${APP.apiUrl}/post/upload`, {
    method: 'POST',
    headers: headersAppend,
    body: formData
  })

  const data = await response.json()

  if (!response.ok) {
    rej(data)
  }

  res(data)
}

export async function uploadPostHttp(file: any, postId: number) {
  return new Promise<uploadResponseType>((resolve, reject) => {
    uploadImagePost(file, postId, resolve, reject)
  })
}
