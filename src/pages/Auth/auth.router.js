import guards from '@/guard'

import LayoutsAuth from '@/layouts/Auth'
import AuthLogin from '@/pages/Auth/Login'
import AuthRegister from '@/pages/Auth/Register'

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
      path: 'register',
      name: 'auth-register',
      component: AuthRegister
    }
  ]
}

export default AuthRouter
