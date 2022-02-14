import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/home')
    },
    {
        path: '/sign_up',
        name: 'SignUp',
        component: () => import('@/views/sign_up')
    },
    {
        path: '/sign_in',
        name: 'SignIn',
        component: () => import('@/views/login')
    },
    {
        path: '/account',
        name: 'account',
        component: () => import('@/views/account')
    },
    {
        path: '/video-detail/:id',
        name: 'video-detail',
        component: () => import('@/views/video-detail')
    },
    {
        path: '/upload_video',
        name: 'vupload_video',
        component: () => import('@/views/upload_video')
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
