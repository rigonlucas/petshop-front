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
                <user-avatar-menu />
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

        <q-page-container>
            <q-page class="q-pa-md">
                <q-breadcrumbs class="q-mb-md">
                    <q-breadcrumbs-el label="Início" icon="home" :to="{ name: 'home' }"/>

                    <q-breadcrumbs-el
                        v-for="route in routeBreadcrumbs"
                        :key="route.label"
                        :label="route.label"
                        :icon="route.icon"
                        :to="route.to"
                    />
                </q-breadcrumbs>
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
import { useAuthStore } from 'src/modules/auth'
import LeftMenu from 'layouts/menus/LeftMenu.vue'
import UserAvatarMenu from 'layouts/menus/UserAvatarMenu.vue'

const leftDrawerOpen = ref(false)
function toggleLeftDrawer() {
    leftDrawerOpen.value = !leftDrawerOpen.value
}

type BreadcrumbRouteEl = {
    label: string
    icon?: string,
    to?: RouteLocationRaw,

}

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
</script>
