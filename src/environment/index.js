export default {
  API: {
    PATH: process.env.API_URL + process.env.API_VERSION,
    EMULATE_JSON: false,
    EMULATE_HTTP: true,
    AUTHORIZATION: 'Authorization',
    BEARER: 'Bearer '
  },
  LINE: {
    AUTHORIZE: process.env.LINE_AUTHORIZE,
    CLIENT_ID: process.env.LINE_CLIENT_ID,
    CALLBACK_URL: process.env.LINE_CALLBACK_URL,
    SCOPE: process.env.LINE_SCOPE
  },
  LOCALSTORAGE: {
    TOKEN: 'rekuru_token',
    USER: 'rekuru_user',
    REFRESH_TOKEN: 'rekuru_refreshToken'
  },
  LANGUAGE: {
    ENGLISH: 'en',
    VIETNAMESE: 'vi'
  },
  CURRENCY: {
    ENGLISH: '$',
    VIETNAMESE: 'VND'
  },
  NOTIFY: {
    SUCCESS: 0,
    ERROR: 1,
    WARNING: 2,
    INFO: 3,
    DURATION: 2000
  },
  STATUS: {
    _200: 200,
    _401: 401,
    _500: 500
  },
  PAGINATE: {
    NEXT: 1,
    PREV: 0
  },
  REGEX: {
    EMAIL: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
    ONLY_NUMBER: /^\d+$/
  }
}
