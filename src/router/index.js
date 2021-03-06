import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch((err) => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/layout/home'
  },
  {
    path: '/layout',
    component: () => import('@/views/Layout'),
    redirect: '/layout/home',
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
  },
  {
    path: '/favorate',
    component: () => import('@/views/Favorate')
  },
  {
    path: '/rent',
    component: () => import('@/views/Rent'),
    children: [
      {
        path: 'rentlist',
        component: () => import('@/views/Rent/RentList')
      },
      {
        path: 'addrent',
        name: 'AddRent',
        component: () => import('@/views/Rent/AddRent')
      },
      {
        path: 'search',
        component: () => import('@/views/Rent/AddRent/Search')
      }
    ]
  },
  {
    path: '/city',
    component: () => import('@/views/City')
  },
  {
    path: '/map',
    component: () => import('@/views/Map')
  },
  {
    path: '/detail/:cityid',
    component: () => import('@/components/RentHouse')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // console.log(to, from)
  if (
    (to.path === '/favorate' ||
      to.path === '/rent/rentlist' ||
      to.path === '/rent/addrent') &&
    !store.state.token
  ) {
    return next('/login')
  }
  next()
})

export default router
