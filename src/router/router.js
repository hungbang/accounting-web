import AuthRouter from '@/pages/Auth/auth.router'
import LayoutsClient from '@/layouts/Client'
import Accountant from '@/pages/Accountant'
import ScreenShare from '@/pages/ScreenShare'

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
      },
      {
        path: 'view',
        name: 'client-accountant-view',
        component: ScreenShare
      }
    ]
  },
  AuthRouter,
  {
    path: '*', redirect: '/'
  }
]

export default AppRouter
