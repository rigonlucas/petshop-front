<template>
    <form @submit.prevent="handleSubmit">
        <div class="row q-py-sm">
            <div class="col">
                <base-input
                    label="Nome"
                    v-model:model-value="formData.name"
                    :error-msg="v$.name.$errors[0]?.$message"
                />
            </div>
        </div>
        <div class="row q-py-sm">
            <div class="col">
                <base-input
                    label="Email"
                    type="email"
                    placeholder="Email do cliente"
                    v-model:model-value="formData.email"
                />
            </div>
        </div>
        <div class="row q-py-sm">
            <div class="col">
                <base-input
                    label="Celular"
                    v-model:model-value="formData.phone"
                />
            </div>
        </div>
        <q-btn
            color="primary"
            type="submit"
            :loading="isLoading"
            :disable="isLoading"
        >
            Salvar
        </q-btn>
    </form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ClientModel } from 'src/features/client/models/ClientModel'
import BaseInput from 'components/Input/BaseInput.vue'
import useVuelidate from '@vuelidate/core'
import { helpers, required } from '@vuelidate/validators'
import ClientService from 'src/features/client/services/ClientService'
import axios from 'axios'
import { notifyNegative, notifyPositive } from 'src/utils/NotifyHelper'

interface ClientFormData {
    name?: string|null
    email?: string|null
    phone?: string|null
}

const props = defineProps<{
    id?: number,
    initialFormData?: ClientModel
}>()

interface Emits {
    (event: 'submiting'): void
    (event: 'error'): void
    (event: 'success', value: ClientModel): void
}
const emit = defineEmits<Emits>()

const formData = reactive<ClientFormData>({
    name: props.initialFormData?.name || '',
    email: props.initialFormData?.email || '',
    phone: props.initialFormData?.phone || '',
})

const requiredWithMessage = helpers.withMessage('Campo obrigatório', required)
const formRules = {
    name: { requiredWithMessage }
}
const v$ = useVuelidate<ClientFormData>(formRules, formData)

const isLoading = ref<boolean>(false)
async function handleSubmit() {
    v$.value.$touch()
    const valid = await v$.value.$validate()
    if (!valid) {
        return
    }
    const submitData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
    }
    try {
        isLoading.value = true
        let client = null
        if (props.id) {
            client = await ClientService.update(props.id, submitData)
            notifyPositive('Cliente atualizado')
        } else {
            client = await ClientService.create(submitData)
            notifyPositive('Cliente cadastrado')
        }

        emit('success', client)
    } catch (error) {
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
