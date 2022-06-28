delete window.history.pushState
delete window.history.replaceState
import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CuentasView from '../views/CuentasView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/cuentas',
    name: 'cuentas',
    component: CuentasView
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
