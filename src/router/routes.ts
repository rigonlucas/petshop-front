import { RouteRecordRaw } from 'vue-router'

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
    {
        path: '/auth',
        component: () => import('layouts/AuthLayout.vue'),
        children: [
            {
                name: 'auth.login',
                path: 'login',
                component: () => import('pages/auth/AuthLogin.vue'),
            },
            {
                name: 'auth.forgot',
                path: 'login',
                component: () => import('pages/auth/AuthLogin.vue'),
            },
        ],
        meta: {
            onlyGuest: true,
        },
    },
    {
        path: '/',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            { name: 'home', path: '', component: () => import('pages/IndexPage.vue') },
            {
                path: '/agendamento',
                children: [
                    {
                        name: 'schedule.index',
                        path: '',
                        component: () => import('pages/schedule/ScheduleIndex.vue'),
                        meta: {
                            title: 'Agendamento',
                            icon: 'calendar_today',
                        },
                        children: [
                            {
                                name: 'schedule.create',
                                path: 'novo',
                                component: () => import('pages/schedule/ScheduleCreate.vue'),
                            },
                            {
                                name: 'schedule.edit',
                                props: true,
                                path: 'editar/:id',
                                component: () => import('pages/schedule/ScheduleEdit.vue'),
                                meta: {
                                    keepScrool: true,
                                }
                            },
                        ],
                    },
                ],
            },
            {
                path: '/clientes',
                children: [
                    {
                        name: 'clients.index',
                        path: '',
                        component: () => import('pages/client/ClientIndex.vue'),
                        meta: {
                            title: 'Clientes',
                            icon: 'calendar_today',
                        },
                    },
                ],
            },
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
