import { RouteRecordRaw } from 'vue-router'

export default [
    {
        path: 'produtos',
        meta: {
            title: 'Produtos',
            icon: 'shopping_bag',
        },
        children: [
            {
                name: 'product.index',
                path: '',
                component: () => import('pages/products/ProductIndex.vue'),
            },
            {
                name: 'product.create',
                path: 'novo',
                component: () => import('pages/products/ProductCreate.vue'),
                meta: {
                    title: 'Novo',
                    icon: 'add',
                },
            },
        ],
    }
] as RouteRecordRaw[]
