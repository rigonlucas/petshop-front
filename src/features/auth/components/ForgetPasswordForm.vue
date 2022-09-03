<template>
    <form @submit.prevent="handleRecovery">
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
        <div class="row q-mt-sm">
            <div class="col">
                <q-btn
                    color="primary"
                    class="full-width"
                    type="submit"
                    :loading="isLoading"
                    :disable="isLoading"
                >Recuperar</q-btn>
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

const form = reactive({
    email: '',
    password: '',
})
const isLoading = ref(false)

async function handleRecovery() {
    isLoading.value = true
    try {
        await AuthService.forgotPassword(form.email)
        notifyPositive('Verifique o email informado')
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
