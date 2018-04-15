import Vue from 'vue'
import VueI18n from 'vue-i18n'
import env from '@/environment'

// Language libary
import languageEn from './lang/en'
import languageVi from './lang/vi'

// Datetime libary
import datetimeEn from './date/en'
import currency from './currency/currency'

Vue.use(VueI18n)

const messages = {
  en: languageEn,
  vi: languageVi
}

const dateTimeFormats = {
  en: datetimeEn
}

const numberFormats = currency

const i18n = new VueI18n({
  locale: env.LANGUAGE.ENGLISH,
  messages,
  dateTimeFormats,
  numberFormats
})

export default i18n
