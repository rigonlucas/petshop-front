<template>
    <q-toolbar-title>
        {{ user.account.name }}
    </q-toolbar-title>
    <q-space/>

    <div class="q-gutter-sm row items-center no-wrap mr-lg-5">
        <q-btn dense flat icon="download" round>
            <q-badge v-if="countExports" color="green" floating rounded text-color="white" transparent>
                {{ countExports }}
            </q-badge>
            <q-tooltip>Meus arquivos</q-tooltip>
            <ProcessNotification @count-notifications="getCountExports"/>
        </q-btn>
        <q-btn color="" flat icon="logout" @click="handleLogout">Sair</q-btn>
    </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from 'src/modules/auth'
import AuthService from 'src/modules/auth/services/AuthService'
import ProcessNotification from 'layouts/Notifications/Process/ProcessNotification.vue'
import { ref } from 'vue'

const authStore = useAuthStore()
const user = authStore.getUser
const countExports = ref(0)

async function handleLogout() {
    await AuthService.logout()
    authStore.clearUserSession()
}

function getCountExports(value: number): void {
    countExports.value = value
}
</script>

<style scoped>

</style>
