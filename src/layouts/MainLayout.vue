<template>
    <q-layout view="lHh Lpr lFf">
        <q-header elevated>
            <q-toolbar>
                <q-btn
                    flat
                    dense
                    round
                    icon="menu"
                    aria-label="Menu"
                    @click="toggleLeftDrawer"
                />
                <top-menu/>
            </q-toolbar>
        </q-header>
        <q-ajax-bar
            ref="bar"
            position="top"
            color="blue"
            size="5px"
            skip-hijack
        />

        <q-drawer
            v-model="leftDrawerOpen"
            show-if-above
            bordered
            :width="200"
        >
            <left-menu></left-menu>

            <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
                <div class="absolute-bottom bg-transparent">
                    <q-avatar size="56px" class="q-mb-dm content-end">
                        <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                    </q-avatar>
                    <div class="text-weight-bold">{{ authStore.getUser.name }}</div>
                </div>
            </q-img>
        </q-drawer>

        <q-page-container class="q-ma-md" :key="route.path">
            <q-breadcrumbs>
                <q-breadcrumbs-el label="Início" icon="home" :to="{ name: 'home' }"/>

                <q-breadcrumbs-el
                    v-for="route in routeBreadcrumbs"
                    :key="route.label"
                    :label="route.label"
                    :icon="route.icon"
                    :to="route.to"
                />
            </q-breadcrumbs>
            <q-page class="q-pa-md">
                <Suspense>
                    <router-view/>
                    <template #fallback>
                        <q-inner-loading
                            color="primary"
                            size="5em"
                            showing
                        />
                    </template>
                </Suspense>
            </q-page>

        </q-page-container>
    </q-layout>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import {
    RouteRecordNormalized,
    useRoute,
    RouteLocationRaw
} from 'vue-router'
import { useAuthStore } from 'stores/auth-store'
import AuthService from 'src/features/auth/services/AuthService'
import LeftMenu from 'layouts/menus/LeftMenu.vue'
import TopMenu from 'layouts/menus/TopMenu.vue'

const leftDrawerOpen = ref(false)
function toggleLeftDrawer() {
    leftDrawerOpen.value = !leftDrawerOpen.value
}

type BreadcrumbRouteEl = {
    label: string
    icon?: string,
    to?: RouteLocationRaw,

}
const route = useRoute()
const routeBreadcrumbs = computed<BreadcrumbRouteEl[]>(() => {
    return useRoute().matched
        .filter((matchedRoute: RouteRecordNormalized): boolean => !!matchedRoute.meta.title)
        .map((matchedRoute: RouteRecordNormalized): BreadcrumbRouteEl => {
            return {
                label: matchedRoute.meta.title ?? '',
                icon: matchedRoute.meta.icon,
                to: { name: matchedRoute.name, path: matchedRoute.path }
            }
        })
})

const authStore = useAuthStore()
authStore.checkSession()

const accountStore = authStore.getUser

async function handleLogout() {
    await AuthService.logout()
    authStore.clearUserSession()
}
</script>
