import { getUserData } from './getUserData'

export function verifyToken() {
  const userData = getUserData()
  const config = {
    headers: {
      accept: 'application/json',
      'content-Type': 'apllication/json',
      Authorization: `Bearer ${userData?.token}`
    }
  }
  return config
}
