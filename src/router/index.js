import Vue from 'vue'
import VueRouter from 'vue-router'

const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch((err) => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/layout'
  },
  {
    path: '/layout',
    component: () => import('@/views/Layout'),
    children: [
      {
        path: 'home',
        component: () => import('@/views/Layout/Home')
      },
      {
        path: 'findhouse',
        component: () => import('@/views/Layout/FindHouse')
      },
      {
        path: 'information',
        component: () => import('@/views/Layout/Information')
      },
      {
        path: 'my',
        component: () => import('@/views/Layout/My')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/Login')
  },
  {
    path: '/registe',
    component: () => import('@/views/Registe')
  }
]

const router = new VueRouter({
  routes
})

export default router
