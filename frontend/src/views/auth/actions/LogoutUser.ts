import { verifyToken } from '../../../helper/verifyToken'
import { APP } from '../../../shared/App'
import { ILogoutInput } from '../auth-types'
verifyToken
APP

export type LogoutResponseType = {
  message: string
}

const logoutUser = async (userId: any, res: any, rej: any) => {
  const { headers } = verifyToken()

  const response = await fetch(`${APP.apiUrl}/auth/logout`, {
    method: 'DELETE',
    headers: headers,
    body: JSON.stringify({ userId: userId })
  })

  const data = await response.json()

  if (!response.ok) {
    rej(data)
  }
  res(data)
}

export async function logoutUserHttp(userId: ILogoutInput) {
  return new Promise((resolve, reject) => {
    logoutUser(userId, resolve, reject)
  })
}
