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

                <q-toolbar-title>
                    Petshop
                </q-toolbar-title>
            </q-toolbar>
        </q-header>

        <q-drawer
            v-model="leftDrawerOpen"
            show-if-above
            bordered
            :width="200"
        >
            <q-list padding style="margin-top: 150px;">
                <q-item clickable v-ripple :to="{ name: 'schedule.index' }">
                    <q-item-section avatar>
                        <q-icon name="calendar_today"/>
                    </q-item-section>

                    <q-item-section>
                        Agendamento
                    </q-item-section>
                </q-item>
            </q-list>

            <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
                <div class="absolute-bottom bg-transparent">
                    <q-avatar size="56px" class="q-mb-sm">
                        <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                    </q-avatar>
                    <div class="text-weight-bold">Fulano de tal</div>
                </div>
            </q-img>
        </q-drawer>

        <q-page-container style="margin: 10px 0 0 10px;" :key="route.path">
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
            <router-view/>
        </q-page-container>
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
    created() {
        console.log(useRoute().matched)
    }
})
</script>
