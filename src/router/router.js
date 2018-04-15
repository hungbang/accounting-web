import AuthRouter from '@/pages/Auth/auth.router'
import LayoutsClient from '@/layouts/Client'
import Accountant from '@/pages/Accountant'

const AppRouter = [
  {
    path: '/',
    name: 'Client',
    component: LayoutsClient,
    children: [
      {
        path: '',
        name: 'client-accountant',
        component: Accountant
      }
    ]
  },
  AuthRouter,
  {
    path: '*', redirect: '/'
  }
]

export default AppRouter
