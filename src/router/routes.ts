import { RouteRecordRaw } from 'vue-router'

declare module 'vue-router' {
    interface RouteMeta {
        title: string
        icon?: string
    }
}

const routes: RouteRecordRaw[] = [
    {
        name: 'home',
        path: '/',
        component: () => import('layouts/MainLayout.vue'),
        children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
    },
    {
        path: '/agendamento',
        component: () => import('layouts/MainLayout.vue'),
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
                    }
                ],
            },
        ],
    },
    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue'),
    },
]

export default routes
