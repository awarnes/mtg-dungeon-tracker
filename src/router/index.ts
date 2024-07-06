import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/dungeon/:id',
      name: 'dungeon',
      component: () => import('../views/DungeonView.vue')
    }
  ]
})

export default router
