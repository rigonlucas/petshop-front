<template>
    <form @submit.prevent="handleLogin">
        <div class="row">
            <div class="col">
                <base-input
                    v-model="form.email"
                    label="Email"
                    type="email"
                    outlined
                />
            </div>
        </div>
        <div class="row">
            <div class="col q-mt-sm">
                <base-input
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
                <q-btn
                    color="primary"
                    class="full-width"
                    type="submit"
                    :loading="isLoading"
                    :disable="isLoading"
                >Entrar</q-btn>
            </div>
        </div>
    </form>
</template>

<script lang="ts" setup>
import { useAuthStore } from 'stores/auth-store'
import AuthService from 'src/features/auth/services/AuthService'
import axios from 'axios'
import { notifyNegative } from 'src/utils/Notify'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseInput from 'components/Input/BaseInput.vue'

const router = useRouter()

const form = reactive({
    email: '',
    password: '',
})
const isLoading = ref(false)

async function handleLogin() {
    const authStore = useAuthStore()
    isLoading.value = true
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
    } finally {
        isLoading.value = false
    }
}
</script>

<style scoped>

</style>
