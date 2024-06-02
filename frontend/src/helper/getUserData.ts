import { LoginResponseType } from '../views/auth/actions/LoginUser'

export function getUserData(): LoginResponseType | undefined {
  const userData = localStorage.getItem('userData')

  try {
    if (typeof userData !== 'object') {
      const connectedUser: LoginResponseType = JSON.parse(userData)

      if (typeof userData === 'undefined') {
        window.location.href = '/'
      }
      return connectedUser
    }
  } catch (error) {
    console.log(error)
  }
}
