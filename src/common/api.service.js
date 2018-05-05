import axios from 'axios'
import ENV from '@/environment'

// Default interceptor public
export const api = axios.create({
  timeout: 10000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

// Default interceptor private
export const _api = axios.create({
  baseURL: ENV.API.PATH,
  timeout: 50000
})

// Add a request interceptor
_api.interceptors.request.use(config => {
  if (localStorage.getItem(ENV.LOCALSTORAGE.TOKEN)) {
    config.headers.Authorization = `${ENV.API.BEARER}${localStorage.getItem(ENV.LOCALSTORAGE.TOKEN)}`
  }

  return config
}, error => {
  return Promise.reject(error)
})

// Add a response interceptor
_api.interceptors.response.use(response => {
  return response.data
}, error => {
  const originalRequest = error.config

  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true

    const refreshToken = localStorage.getItem(ENV.LOCALSTORAGE.REFRESH_TOKEN)

    return _api.get('auth/refreshToken', {
      params: {
        refreshToken: refreshToken
      }
    })
      .then(data => {
        localStorage.setItem(ENV.LOCALSTORAGE.TOKEN, data.access_token)
        localStorage.setItem(ENV.LOCALSTORAGE.REFRESH_TOKEN, data.refresh_token)
        axios.defaults.headers.common[ENV.API.AUTHORIZATION] = `${ENV.API.BEARER}${localStorage.getItem(ENV.LOCALSTORAGE.TOKEN)}`
        originalRequest.headers[ENV.API.AUTHORIZATION] = `${ENV.API.BEARER}${localStorage.getItem(ENV.LOCALSTORAGE.TOKEN)}`
        return axios(originalRequest)
      })
  }

  return Promise.reject(error)
})
