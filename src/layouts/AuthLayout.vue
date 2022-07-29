<template>
    <q-layout view="hHh lpR fFf" class="flex justify-center" style="align-items: center">
        <q-card class="q-pa-md" style="width: 600px; max-width: 80vw; height: 500px">
            <router-view />
        </q-card>
    </q-layout>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import {
    RouteRecordNormalized,
    useRoute,
    RouteLocationRaw
} from 'vue-router'

type BreadcrumbRouteEl = {
    label: string
    icon?: string,
    to?: RouteLocationRaw,

}

function routeBreadcrumbs(): BreadcrumbRouteEl[] {
    return useRoute().matched
        .filter((matchedRoute: RouteRecordNormalized): boolean => !!matchedRoute.meta.title)
        .map((matchedRoute: RouteRecordNormalized): BreadcrumbRouteEl => {
            return {
                label: matchedRoute.meta.title,
                icon: matchedRoute.meta.icon,
                to: { name: matchedRoute.name }
            }
        })
}

export default defineComponent({
    name: 'MainLayout',

    setup() {
        const leftDrawerOpen = ref(false)
        const route = useRoute()

        return {
            leftDrawerOpen,
            toggleLeftDrawer() {
                leftDrawerOpen.value = !leftDrawerOpen.value
            },

            routeBreadcrumbs: computed<BreadcrumbRouteEl[]>(routeBreadcrumbs),
            route,
        }
    },
})
</script>
