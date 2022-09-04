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
                path: 'recuperar',
                component: () => import('pages/auth/AuthForgetPassword.vue'),
            },
            {
                name: 'auth.recovery',
                path: 'alterar-senha/:hash',
                props: true,
                component: () => import('pages/auth/AuthChangePassword.vue'),
            },
        ],
        meta: {
            onlyGuest: true,
        },
    },
    {
        path: '/registrar',
        component: () => import('layouts/RegisterLayout.vue'),
        children: [
            {
                name: 'auth.register',
                path: ':code',
                props: true,
                component: () => import('pages/auth/AuthRegister.vue'),
            },
        ],
    },
]
