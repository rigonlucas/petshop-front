import { RouteRecordRaw } from 'vue-router'

export default [
    {
        path: '/auth',
        component: () => import('src/modules/auth/ModuleRoot.vue'),
        children: [
            {
                path: '',
                redirect: { name: 'auth.login' }
            },
            {
                name: 'auth.login',
                path: 'login',
                component: () => import('src/modules/auth/pages/AuthLogin.vue'),
            },
            {
                name: 'auth.forgot',
                path: 'recuperar',
                component: () => import('src/modules/auth/pages/AuthForgetPassword.vue'),
            },
            {
                name: 'auth.recovery',
                path: 'alterar-senha/:hash',
                props: true,
                component: () => import('src/modules/auth/pages/AuthChangePassword.vue'),
            },
            {
                name: 'auth.register',
                path: 'registrar/:code',
                props: true,
                component: () => import('src/modules/auth/pages/AuthRegister.vue'),
            },
        ],
        meta: {
            onlyGuest: true,
        },
    },
] as RouteRecordRaw[]
