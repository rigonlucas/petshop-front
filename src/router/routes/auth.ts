export default [
    {
        path: '/auth',
        component: () => import('layouts/AuthLayout.vue'),
        children: [
            {
                name: 'auth.login',
                path: 'login',
                component: () => import('pages/auth/AuthLogin.vue'),
            },
            {
                name: 'auth.forgot',
                path: 'login',
                component: () => import('pages/auth/AuthLogin.vue'),
            },
        ],
        meta: {
            onlyGuest: true,
        },
    }
]
