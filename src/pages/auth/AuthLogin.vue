<template>
    <div class="auth-login">
        <div class="row">
            <div class="col text-center">
                <h3>Login</h3>
            </div>
        </div>
        <form @submit.prevent="handleLogin">
            <div class="row">
                <div class="col">
                    <q-input
                        v-model="form.email"
                        label="Email"
                        outlined
                    />
                </div>
            </div>
            <div class="row">
                <div class="col q-mt-sm">
                    <q-input
                        v-model="form.password"
                        label="Senha"
                        type="password"
                        outlined
                    />
                </div>
            </div>
            <div class="row q-mt-xs justify-end">
                <div class="col text-right">
                    <router-link :to="{ name: 'auth.forgot' }">
                        Enqueci minha senha
                    </router-link>
                </div>
            </div>
            <div class="row q-mt-sm">
                <div class="col">
                    <q-btn color="primary" class="full-width" type="submit">Entrar</q-btn>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useAuthStore } from 'stores/auth-store'
import AuthService from 'src/features/auth/services/AuthService'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { notifyNegative } from 'src/utils/Notify'

const form = reactive({
    email: '',
    password: '',
})
const router = useRouter()

async function handleLogin() {
    const authStore = useAuthStore()
    try {
        const data = await AuthService.login(form.email, form.password)
        authStore.setUser(data.user)
        authStore.setToken(data.token)

        await router.push({ name: 'home' })
    } catch (error: unknown) {
        if (!axios.isAxiosError(error)) {
            throw error
        }

        notifyNegative(error.response && error.response.data.message)
    }
}
</script>
