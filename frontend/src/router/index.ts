import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import DonateView from '@/views/DonateView.vue'
import DonorDetailsView from '@/views/DonorDetailsView.vue'
import ContactView from '@/views/ContactView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/donate',
      name: 'donate',
      component: DonateView,
    },
    {
      path: '/donor/:id',
      name: 'donor-details',
      component: DonorDetailsView,
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView,
    },
  ],
})

export default router