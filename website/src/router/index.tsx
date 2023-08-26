import Home from '@/views/Home'
import Register from '@/views/Register'
import Login from '@/views/Login'
import ManagerLayout from '@/layouts/ManagerLayout'
import Member from '@/views/Member'
import Commodity from '@/views/Commodity'
import Order from '@/views/Order'
import { createRouter, createWebHistory } from 'vue-router'
import Statistics from '@/views/Statistics'
import CommodityDetail from '@/views/CommodityDetail'
import MainLayout from '@/layouts/MainLayout'
import BuyHistory from '@/views/BuyHistory'
import MemberDetail from '@/views/MemberDetail'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      component: <MainLayout />,
      path: '/',
      redirect: { name: 'home' },
      children: [
        {
          path: 'login',
          component: <Login />,
          name: 'Login'
        },
        {
          path: 'register',
          component: <Register />,
          name: 'register'
        },
        {
          path: '',
          component: <Home />,
          name: 'home'
        },
        {
          path: 'commodity/:id',
          component: <CommodityDetail />,
          name: 'commodity-detail'
        },
        {
          path: 'buy-history',
          component: <BuyHistory />,
          name: 'buy-history'
        },
        {
          path: 'member-detail',
          component: <MemberDetail />,
          name: 'member-detail'
        }
      ]
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
        },
        {
          path: 'statistics',
          component: () => <Statistics />,
          name: 'statistics'
        }
      ]
    }
  ]
})

export default router
