import { RouteRecordRaw } from 'vue-router'

export default [
    {
        path: '/clientes',
        children: [
            {
                name: 'client.index',
                path: '',
                component: () => import('pages/client/ClientIndex.vue'),
                meta: {
                    title: 'Clientes',
                    icon: 'group',
                },
            },
        ],
    }
] as RouteRecordRaw[]
