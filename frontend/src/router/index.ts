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
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/views/SignupView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue'),
      
    },
    {
      path: '/donate',
      name: 'donate',
      component: DonateView,
    },
   {
  path: "/donors/:id",
  name: "DonorDetails",
  component: () => import("@/views/DonorDetailsView.vue"),
},
    {
      path: '/contact',
      name: 'contact',
      component: ContactView,
    },
    {
      path: '/centers',
      name: 'centers',
      component: () => import('@/views/CentersView.vue'),
    },
    {
  path: '/dashboard',
  name: 'dashboard',
  component: () => import('@/views/DashboardView.vue')
},

{
      path: '/recipients',
      name: 'recipients',
      component: () => import('@/views/RecipientsView.vue')
    },
  ],
})

export default router
