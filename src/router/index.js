import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/map',
    component: () => import('@/views/MapView.vue')
  },
  {
    path: '/risk-status',
    component: () => import('@/views/RiskStatus.vue')
  },
  {
    path: '/evacuation-route',
    component: () => import('@/views/EvacuationRoute.vue')
  },
  {
    path: '/weather',
    component: () => import('@/views/WeatherForecast.vue')
  },
  {
    path: '/analytics',
    component: () => import('@/views/Analytics.vue')
  },
  {
    path: '/about',
    component: () => import('@/views/About.vue')
  },
  {
    path: '/safety',
    component: () => import('@/views/Safety.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
