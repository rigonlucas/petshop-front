<template>
    <q-toolbar-title>
        {{ user.account.name }}
    </q-toolbar-title>
    <q-space/>

    <div class="q-gutter-sm row items-center no-wrap mr-lg-5">
        <q-btn dense flat icon="notifications" round>
            <div id="countDownloads"></div>
            <q-tooltip>Meus processamentos</q-tooltip>
            <ProcessNotification/>
        </q-btn>
    </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from 'src/modules/auth'
import AuthService from 'src/modules/auth/services/AuthService'
import ProcessNotification from 'layouts/Notifications/Process/ProcessNotification.vue'

const authStore = useAuthStore()
const user = authStore.getUser

async function handleLogout() {
    await AuthService.logout()
    authStore.clearUserSession()
}
</script>

<style scoped>

</style>
