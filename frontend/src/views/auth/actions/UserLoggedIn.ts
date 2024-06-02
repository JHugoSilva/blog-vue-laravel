import { verifyToken } from '../../../helper/verifyToken'
import { APP } from '../../../shared/App'

export type IsLoggedInResponseType = {
  message: string
}

const userIsLoggedIn = async (res: any, rej: any) => {
  const { headers } = verifyToken()
  const response = await fetch(`${APP.apiUrl}/auth/loggedIn`, {
    method: 'GET',
    headers: headers
  })

  const data = await response.json()

  if (response.ok) {
    rej(data)
  }
  res(data)
}

export async function userIsLoggedInHttp() {
  return new Promise<IsLoggedInResponseType>((resolve, reject) => {
    userIsLoggedIn(resolve, reject)
  })
}
