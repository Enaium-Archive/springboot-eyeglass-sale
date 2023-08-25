import Home from '@/views/Home'
import Register from '@/views/Register'
import Login from '@/views/Login'
import ManagerLayout from '@/layouts/ManagerLayout'
import Member from '@/views/Member'
import Commodity from '@/views/Commodity'
import Order from '@/views/Order'
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
    },
    {
      path: '/manager',
      component: <ManagerLayout />,
      redirect: { name: 'member' },
      children: [
        {
          path: 'member',
          component: <Member />,
          name: 'member'
        },
        {
          path: 'commodity',
          component: <Commodity />,
          name: 'commodity'
        },
        {
          path: 'order',
          component: <Order />,
          name: 'order'
        }
      ]
    }
  ]
})

export default router
