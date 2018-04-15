import Vue from 'vue'
import Router from 'vue-router'
import appRouter from './router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: appRouter
})

export default router
