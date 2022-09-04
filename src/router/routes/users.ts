import { RouteRecordRaw } from 'vue-router'

export default [
    {
        path: '/users',
        children: [
            {
                name: 'users.index',
                path: '',
                component: () => import('pages/user/UserIndex.vue'),
                meta: {
                    title: 'Usuários',
                    icon: 'manage_accounts',
                },
            },
        ],
    }
] as RouteRecordRaw[]
