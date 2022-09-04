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
            <div class="col">
                <base-input
                    v-model="form.password"
                    label="Senha"
                    type="password"
                    outlined
                />
            </div>
        </div>
        <div class="row">
            <div class="col">
                <base-input
                    v-model="form.password_confirmation"
                    label="Senha"
                    type="password"
                    outlined
                />
            </div>
        </div>
        <div class="row q-mt-sm">
            <div class="col">
                <q-btn
                    color="green"
                    class="full-width"
                    type="submit"
                    :loading="isLoading"
                    :disable="isLoading"
                >Salvar</q-btn>
            </div>
        </div>
    </form>
</template>

<script lang="ts" setup>
import AuthService from 'src/features/auth/services/AuthService'
import axios from 'axios'
import { notifyNegative, notifyPositive } from 'src/utils/Notify'
import { reactive, ref } from 'vue'
import BaseInput from 'components/Input/BaseInput.vue'
import { useRouter } from 'vue-router'

const form = reactive({
    email: '',
    password: '',
    password_confirmation: '',
})
const isLoading = ref(false)
const props = defineProps({
    hash: {
        type: String,
    },
})
const router = useRouter()

async function handleLogin() {
    isLoading.value = true
    try {
        await AuthService.changePassword(form.email, form.password, form.password_confirmation, props.hash)
        notifyPositive('Senha alterada')
        await router.push({ name: 'auth.login' })
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
