import Home from '@/views/Home'
import Register from '@/views/Register'
import Login from '@/views/Login'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: <Home />,
      name: 'Home'
    },
    {
      path: '/login',
      component: <Login />,
      name: 'Login'
    },
    {
      path: '/register',
      component: <Register />,
      name: 'Register'
    }
  ]
})

export default router
