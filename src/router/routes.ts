import { RouteRecordRaw } from 'vue-router'
import clients from 'src/router/routes/clients'
import schedules from 'src/router/routes/schedules'
import auth from 'src/router/routes/auth'
import products from 'src/router/routes/products'
import users from 'src/router/routes/users'

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
    ...auth,
    {
        path: '/',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            { name: 'home', path: '', component: () => import('pages/IndexPage.vue') },
            ...schedules,
            ...clients,
            ...products,
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
