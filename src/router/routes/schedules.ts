export default [
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
    }
]
