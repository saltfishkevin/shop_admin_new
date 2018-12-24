import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Users from '../components/Users.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: '/users',
          component: Users
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  console.log('哈哈哈')
  console.log(to, from)
  if (to.path === '/login') {
    next()
  } else {
    let token = localStorage.getItem('token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  }
})

export default router
