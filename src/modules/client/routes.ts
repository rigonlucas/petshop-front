import { RouteLocation, RouteRecordRaw } from 'vue-router'

export default [
    {
        path: '/clientes',
        component: () => import('src/modules/client/ModuleRoot.vue'),
        children: [
            {
                name: 'client.index',
                path: '',
                component: () => import('src/modules/client/pages/ClientIndex.vue'),
                meta: {
                    title: 'Clientes',
                    icon: 'group',
                },
            },
            {
                name: 'client.create',
                path: 'novo',
                component: () => import('src/modules/client/pages/ClientCreate.vue'),
                meta: {
                    title: 'Novo cliente',
                    icon: 'group',
                },
            },
            {
                name: 'client.edit',
                path: 'editar/:id',
                component: () => import('src/modules/client/pages/ClientEdit.vue'),
                props: (route: RouteLocation) => ({ id: parseInt(route.params.id as string) }),
                meta: {
                    title: 'Editar',
                    icon: 'edit',
                },
            },
        ],
    }
] as RouteRecordRaw[]
