import AuthRouter from '@/pages/Auth/auth.router'

const LayoutsClient = () => import('@/layouts/Client')
const Accountant = () => import('@/pages/Accountant')
const ScreenShare = () => import('@/pages/ScreenShare')

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
