import { RouteRecordRaw } from 'vue-router'

export default [
    {
        path: '/auth',
        component: () => import('layouts/AuthLayout.vue'),
        children: [
            {
                path: '',
                redirect: { name: 'auth.login' }
            },
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
            {
                name: 'auth.register',
                path: 'registrar/:code',
                props: true,
                component: () => import('pages/auth/AuthRegister.vue'),
            },
        ],
        meta: {
            onlyGuest: true,
        },
    },
] as RouteRecordRaw[]
