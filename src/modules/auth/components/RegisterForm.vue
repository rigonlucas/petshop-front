<template>
    <form @submit.prevent="handleLogin">
        <div class="row">
            <div class="col">
                <base-input
                    v-model="form.name"
                    label="Nome"
                    type="text"
                    outlined
                    :error-message="errors.name ? errors.name[0] : ''"
                    :error="!!errors.name"
                />
            </div>
        </div>
        <div class="row">
            <div class="col">
                <base-input
                    v-model="form.email"
                    label="Email"
                    type="email"
                    outlined
                    :error-message="errors.email ? errors.email[0] : ''"
                    :error="!!errors.email"
                />
            </div>
        </div>
        <div class="row">
            <div class="col">
                <base-input
                    v-model="form.phone"
                    label="Telefone"
                    type="text"
                    outlined
                    :error-message="errors.phone ? errors.phone[0] : ''"
                    :error="!!errors.phone"
                />
            </div>
        </div>
        <div class="row">
            <div class="col">
                <base-input
                    v-model="form.company_name"
                    label="Nome da sua empresa"
                    type="text"
                    outlined
                    :error-message="errors.company_name ? errors.company_name[0] : ''"
                    :error="!!errors.company_name"
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
                    :error-message="errors.password ? errors.password[0] : ''"
                    :error="!!errors.password"
                />
            </div>
        </div>
        <div class="row">
            <div class="col q-mt-sm">
                <base-input
                    v-model="form.password_confirmation"
                    label="Repita a senha"
                    type="password"
                    outlined
                    :error-message="errors.password ? errors.password[0] : ''"
                    :error="!!errors.password"
                />
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
                >Registrar</q-btn>
            </div>
        </div>
    </form>
</template>

<script lang="ts" setup>
import { useAuthStore } from 'src/modules/auth'
import AuthService from 'src/modules/auth/services/AuthService'
import axios from 'axios'
import { notifyNegative } from 'src/utils/NotifyHelper'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseInput from 'components/Input/BaseInput.vue'
import { RegisterModel } from 'src/modules/auth/models/RegisterModel'
import { ApiErrors } from 'src/models/ApiModels'

const router = useRouter()
const props = defineProps({
    code: {
        type: String,
        required: true
    }
})
const errors = reactive({
    name: '',
    email: '',
    phone: '',
    company_name: '',
    password: '',
})
const form = reactive<RegisterModel>({
    email: '',
    password: '',
    password_confirmation: '',
    name: '',
    phone: '',
    company_name: '',
    code: props.code,
})

const isLoading = ref(false)

async function handleLogin() {
    const authStore = useAuthStore()
    Object.assign(errors, {
        name: '',
        email: '',
        phone: '',
        company_name: '',
        password: '',
    })
    isLoading.value = true
    try {
        const data = await AuthService.registerAccount(form)
        authStore.setUser(data.user)
        authStore.setToken(data.token)

        await router.push({ name: 'home' })
    } catch (error: unknown) {
        if (!axios.isAxiosError(error)) {
            throw error
        }
        const responseData: ApiErrors | null = error.response?.data
        let caption
        if (responseData?.errors) {
            caption = Object.values(responseData.errors).flat().join('<br>')
        }
        Object.assign(errors, responseData?.errors)
        notifyNegative('Não foi possível realizar o cadastro', caption)
    } finally {
        isLoading.value = false
    }
}
</script>

<style scoped>

</style>
