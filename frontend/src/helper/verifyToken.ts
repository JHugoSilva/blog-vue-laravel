import { getUserData } from './getUserData'

export function verifyToken() {
  const userData = getUserData()
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json, multipart/form-data',
      Authorization: `Bearer ${userData?.token}`
    }
  }
  return config
}
