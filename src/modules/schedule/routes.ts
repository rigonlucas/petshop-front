import { RouteRecordRaw } from 'vue-router'

export default [
    {
        path: '/agendamento',
        component: () => import('src/modules/schedule/ModuleRoot.vue'),
        children: [
            {
                name: 'schedule.index',
                path: '',
                component: () => import('src/modules/schedule/pages/ScheduleIndex.vue'),
                meta: {
                    title: 'Agendamento',
                    icon: 'calendar_today',
                },
                children: [
                    {
                        name: 'schedule.create',
                        path: 'novo',
                        component: () => import('src/modules/schedule/pages/ScheduleCreate.vue'),
                    },
                    {
                        name: 'schedule.edit',
                        props: true,
                        path: 'editar/:id',
                        component: () => import('src/modules/schedule/pages/ScheduleEdit.vue'),
                        meta: {
                            keepScrool: true,
                        }
                    },
                ],
            },
        ],
    }
] as RouteRecordRaw[]
