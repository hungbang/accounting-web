import store from '@/store'

export default {
  isLogin (to, from, next) {
    if (store.getters.isAuth) {
      next({name: 'client-accountant'})
    } else {
      next()
    }
  },
  isAuth (to, from, next) {
    if (to.meta.requiresAuth) {
      if (store.getters.isAuth) {
        next()
      } else {
        next({name: 'auth-login'})
      }
    } else {
      next()
    }
  }
}
