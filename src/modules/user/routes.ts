import { RouteRecordRaw } from 'vue-router'

export default [
    {
        path: '/users',
        component: () => import('src/modules/user/ModuleRoot.vue'),
        children: [
            {
                name: 'users.index',
                path: '',
                component: () => import('src/modules/user/pages/UserIndex.vue'),
                meta: {
                    title: 'Usuários',
                    icon: 'manage_accounts',
                },
            },
        ],
    }
] as RouteRecordRaw[]
