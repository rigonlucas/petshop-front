<template>
    <q-layout view="hHh lpR fFf" class="flex justify-center" style="align-items: center">
        <q-card class="q-pa-md" style="width: 600px;">
            <router-view />
        </q-card>
    </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
    name: 'AuthLayout',
    setup() {
        const route = useRoute()

        return {
            route,
        }
    },
})
</script>
