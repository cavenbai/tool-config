import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'basement',
    component: () => import('../views/basement.vue')
  },
  {
    path: '/nvr',
    name: 'NVR',
    component: () => import('../views/nvr.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
