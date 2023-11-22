import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router'
import baseRouter from './baseRouter.js'

const router = createRouter({
  history:  import.meta.env.MODE=="development"?
    createWebHashHistory():createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...baseRouter
  ]
})

export default router
