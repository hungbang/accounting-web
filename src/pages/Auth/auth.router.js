import guards from '@/guard'

const LayoutsAuth = () => import('@/layouts/Auth')
const AuthLogin = () => import('@/pages/Auth/Login')
const AuthRegister = () => import('@/pages/Auth/Register')

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
