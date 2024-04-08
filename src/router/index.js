import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/Layout/index.vue';
import Login from '@/views/Login/index.vue';
import SubCategory from "@/views/SubCategory/index.vue"
import Detail from "@/views/Detail/index.vue"
import CartList from '@/views/CartList/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Layout,
      children:[
        {
          path:'/',
          component:()=>import('@/views/Home/index.vue')
        },
        {
          path:'/category/:id',
          component:()=>import('@/views/Category/index.vue'),
        },
        {
          path:'/category/sub/:id',
          component:SubCategory,
        },
        {
          path:'/detail/:id',
          component:Detail,
        },
        {
          path:'/cartlist',
          component:CartList,
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    }
  ],
  scrollBehavior(){
    return {
      // 滚动到顶部
      top: 0,
    }
  },
})

export default router
