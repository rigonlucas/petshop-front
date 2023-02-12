import { RouteLocation, RouteRecordRaw } from 'vue-router'

export default [
    {
        path: 'produtos',
        component: () => import('src/modules/products/ModuleRoot.vue'),
        meta: {
            title: 'Produtos',
            icon: 'shopping_bag',
        },
        children: [
            {
                name: 'product.index',
                path: '',
                component: () => import('src/modules/products/pages/ProductIndex.vue'),
            },
            {
                name: 'product.create',
                path: 'novo',
                component: () => import('src/modules/products/pages/ProductCreate.vue'),
                meta: {
                    title: 'Novo',
                    icon: 'add',
                },
            },
            {
                name: 'product.edit',
                path: 'editar/:id',
                component: () => import('src/modules/products/pages/ProductEdit.vue'),
                props: (route: RouteLocation) => ({ id: parseInt(route.params.id as string) }),
                meta: {
                    title: 'Editar',
                    icon: 'edit',
                },
            },
        ],
    }
] as RouteRecordRaw[]
