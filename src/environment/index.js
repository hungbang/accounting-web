export default {
  DOMAIN: process.env.DOMAIN,
  APP_VERSION: 'codeshark-v0.1',
  APP_OLD_VERSION: 'accountant-version',
  API: {
    PATH: process.env.API_URL + process.env.API_VERSION,
    WS: process.env.API_WS,
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
    TOKEN: 'codeshark_token',
    USER: 'codeshark_user',
    REFRESH_TOKEN: 'codeshark_refreshToken'
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
