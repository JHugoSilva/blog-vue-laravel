import { getUserData } from './getUserData'

export function verifyToken() {
  const userData = getUserData()
  const config = {
    headers: {
      accept: 'application/json',
      'content-Type': 'application/json',
      Authorization: `Bearer ${userData?.token}`
    }
  }
  return config
}
