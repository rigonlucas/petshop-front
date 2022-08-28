export default [
    {
        path: '/produtos',
        children: [
            {
                name: 'product.index',
                path: '',
                component: () => import('pages/products/ProductIndex.vue'),
                meta: {
                    title: 'Produtos',
                    icon: 'shopping_bag',
                },
            },
        ],
    }
]
