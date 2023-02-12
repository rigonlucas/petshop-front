import { RouteRecordRaw } from 'vue-router'
import { routes as clientRoutes } from 'src/modules/client'
import { routes as scheduleRoutes } from 'src/modules/schedule'
import { routes as authRoutes } from 'src/modules/auth'
import { routes as productRoutes } from 'src/modules/products'

import users from 'src/modules/user/routes'

declare module 'vue-router' {
    interface RouteMeta {
        title?: string
        icon?: string
        isProtected?: boolean
        onlyGuest?: boolean
        keepScrool?: boolean
    }
}

const routes: RouteRecordRaw[] = [
    ...authRoutes,
    {
        path: '/',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            { name: 'home', path: '/dashboard', component: () => import('pages/IndexPage.vue') },
            ...scheduleRoutes,
            ...clientRoutes,
            ...productRoutes,
            ...users,
        ],
        meta: {
            isProtected: true,
        },
    },
    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue'),
    },
]

export default routes
