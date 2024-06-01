import { APP } from '../../../shared/App'
import type { IRegisterInput } from '../auth-types'

type RegisterResponseType = {
  user: IRegisterInput
  message: string
}

const httpCreated = async (input: any, res: any, rej: any) => {
  const response = await fetch(`${APP.apiUrl}/auth/register`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-Type': 'application/json'
    },
    body: JSON.stringify(input)
  })
  const data = await response.json()
  console.log(data.message)

  if (!response.ok) {
    rej(data)
  }
  res(data)
}

export async function createUserHttp(input: IRegisterInput) {
  return new Promise<RegisterResponseType>((resolve, reject) => {
    httpCreated(input, resolve, reject)
  })
}
