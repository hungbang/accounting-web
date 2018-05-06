import axios from 'axios'
import ENV from '@/environment'
import helper from '@/common/helper.service'

// Default interceptor public
export const api = axios.create({
  timeout: 10000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

// Add a response interceptor
api.interceptors.response.use(response => {
  return response.data
}, error => {
  return Promise.reject(error)
})

// Default interceptor private
export const _api = axios.create({
  baseURL: ENV.API.PATH,
  timeout: 50000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

// Add a response interceptor
_api.interceptors.response.use(response => {
  return response.data
}, error => {
  return Promise.reject(error)
})

// Default interceptor private
export const _apiAuth = axios.create({
  baseURL: ENV.API.PATH,
  timeout: 50000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

// Add a request interceptor
_apiAuth.interceptors.request.use(config => {
  if (localStorage.getItem(ENV.LOCALSTORAGE.TOKEN)) {
    config.headers.Authorization = `${ENV.API.BEARER}${localStorage.getItem(ENV.LOCALSTORAGE.TOKEN)}`
  }

  return config
}, error => {
  return Promise.reject(error)
})

// Add a response interceptor
_apiAuth.interceptors.response.use(response => {
  return response.data
}, error => {
  const originalRequest = error.config

  if (error.response && error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true

    const data = {
      grant_type: 'refresh_token',
      refresh_token: localStorage.getItem(ENV.LOCALSTORAGE.REFRESH_TOKEN)
    }
    const _headers = {
      'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
      Authorization: 'Basic ' + btoa('accountant-client:android-secret')
    }

    return api.post('https://etz.trade/oauth/token', helper.queryString(data), {headers: _headers})
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
