import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/list-movie',
        name: 'list-movie',
        component: () => import('../components/ListMovie.vue') 
    },
    {
        path: '/detail-movie',
        name: 'detail-movie',
        component: () => import('../components/DetailMovie.vue') 
    },
    {
        path: '/AddMovie',
        name: 'AddMovie',
        component: () => import('../components/AddMovie.vue')
    },
    {
        path: '/edit/:id',
        name: 'edit-movie',
        component: () => import('../components/EditMovie.vue')
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
  })
  
export default router;