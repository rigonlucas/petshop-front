<template>
    <q-toolbar-title>
        {{ user.account.name }}
    </q-toolbar-title>
    <q-space />

    <div class="q-gutter-sm row items-center no-wrap mr-lg-5">
        <q-btn round dense flat color="grey-8" icon="notifications">
            <q-badge color="red" text-color="white" floating>
                2
            </q-badge>
            <q-tooltip>Notifications</q-tooltip>
        </q-btn>
        <q-btn round dense flat icon="account_circle">
            <q-tooltip>Minha conta</q-tooltip>
            <q-menu>
                <q-list style="min-width: 100px">
                    <q-item
                        v-if="user.id === user.account.user_id"
                        clickable
                        v-close-popup
                        :to="{ name: 'users.index' }"
                    >
                        <q-item-section>Usuários</q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item clickable v-close-popup>
                        <q-item-section>Ajuda &amp; Feedback</q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item clickable v-close-popup>
                        <q-item-section @click="handleLogout">Sair</q-item-section>
                    </q-item>
                </q-list>
            </q-menu>
        </q-btn>
    </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from 'stores/auth-store'
import AuthService from 'src/features/auth/services/AuthService'

const authStore = useAuthStore()
const user = authStore.getUser

async function handleLogout() {
    await AuthService.logout()
    authStore.clearUserSession()
}
</script>

<style scoped>

</style>
