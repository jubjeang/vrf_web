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
    component: () => import('../views/Request_VRF_Lst.vue')
  },
  {
    path: '/templatevrflst',
    name: 'template_vrf_lst',
    component: () => import('../views/Template_VRF_Lst.vue')
  },
  {
    path: '/approvevrflst',
    name: 'approve_vrf_lst',
    component: () => import('../views/Approve_VRF_Lst.vue')
  },
  {
    path: '/vrflstforsecurity',
    name: 'vrf_lst_for_security',
    component: () => import('../views/VRF_Lst_for_Security.vue')
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
