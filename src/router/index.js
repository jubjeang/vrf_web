import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/requestvrflst',
    name: 'request_vrf_lst',
    component: () => import('../views/request_vrf_lst.vue')
  },
  {
    path: '/templatevrflst',
    name: 'template_vrf_lst',
    component: () => import('../views/template_vrf_lst.vue')
  },
  {
    path: '/main',
    name: 'Main',
    component: () => import('../views/Main.vue')
  },       
]

const router = createRouter({
  history: createWebHistory(),
  // history: createWebHistory(process.env.BASE_URL),  
  routes
})

export default router
