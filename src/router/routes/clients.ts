import { RouteLocation, RouteRecordRaw } from 'vue-router'

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
            {
                name: 'client.create',
                path: 'novo',
                component: () => import('pages/client/ClientCreate.vue'),
                meta: {
                    title: 'Novo cliente',
                    icon: 'group',
                },
            },
            {
                name: 'client.edit',
                path: 'editar/:id',
                component: () => import('pages/client/ClientEdit.vue'),
                props: (route: RouteLocation) => ({ id: parseInt(route.params.id as string) }),
                meta: {
                    title: 'Editar',
                    icon: 'edit',
                },
            },
        ],
    }
] as RouteRecordRaw[]
