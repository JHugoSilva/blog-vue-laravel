import { APP } from '../../../shared/App'
import type { ILoginInput } from '../auth-types'

export type LoginResponseType = {
  user: {
    id: number
    name: string
    email: string
  }
  token: string
}

const loginHttp = async (input: any, res: any, rej: any) => {
  console.log(input.email)

  const response = await fetch(`${APP.apiUrl}/auth/login`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-Type': 'application/json'
    },
    body: JSON.stringify(input)
  })

  const data = await response.json()

  if (!response.ok) {
    rej(data)
  }

  res(data)
}

export async function loginUserHttp(input: ILoginInput) {
  return new Promise<LoginResponseType>((resolve, reject) => {
    loginHttp(input, resolve, reject)
  })
}
