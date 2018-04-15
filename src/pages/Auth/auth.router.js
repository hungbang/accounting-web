import guards from '@/guard'

import LayoutsAuth from '@/layouts/Auth'
import AuthLogin from '@/pages/Auth/Login'
import AuthRegister from '@/pages/Auth/Register'
import AuthTwoFactor from '@/pages/Auth/TwoFactor'
import AuthEnabled from '@/pages/Auth/Enabled'

export const AuthRouter = {
  path: '/auth',
  name: 'auth',
  component: LayoutsAuth,
  beforeEnter: guards.isLogin,
  redirect: {
    name: 'auth-login'
  },
  children: [
    {
      path: 'login',
      name: 'auth-login',
      component: AuthLogin
    },
    {
      path: 'factor',
      name: 'auth-factor',
      component: AuthTwoFactor
    },
    {
      path: 'register',
      name: 'auth-register',
      component: AuthRegister
    },
    {
      path: 'enabled',
      name: 'auth-enabled',
      component: AuthEnabled,
      beforeEnter: (to, from, next) => {
        if (to.query.token) {
          next()
        } else {
          next({name: 'auth-login'})
        }
      }
    }
  ]
}

export default AuthRouter
