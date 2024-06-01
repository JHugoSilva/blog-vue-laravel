interface IApi {
  apiStatus: 'developpement' | 'production'
  developpement: {
    baseUrl: string
    apiUrl: string
  }
  production: {
    baseUrl: string
    apiUrl: string
  }
}

const appApi: IApi = {
  developpement: {
    baseUrl: 'http://127.0.0.1:8000',
    apiUrl: 'http://127.0.0.1:8000/api'
  },
  production: {
    baseUrl: '',
    apiUrl: ''
  },
  apiStatus: 'developpement'
}

export const APP = appApi.apiStatus === 'developpement' ? appApi.developpement : appApi.production
