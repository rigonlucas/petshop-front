<template>
    <transition enter-active-class="animated fadeIn">
        <add-products-form
            v-if="showProducts"
            v-model:products="formData.products"
            @add-product="handleAddProduct"
            @go-back="closeProducts"
            :schedule-id="props.id"
        />
        <form
            v-else
            id="schedule-form"
            @submit.prevent="handleSubmit"
        >
            <info-banner :form-data="formData" />
            <schedule-client-form
                v-model:client="formData.client"
                v-model:pet="formData.pet"
                :pet-errors="v$.pet.$errors"
                :client-errors="v$.client.$errors"
            />
            <schedule-service-form
                v-model:type="formData.type"
                v-model:duration="formData.duration"
                v-model:start_at="formData.start_at"
                v-model:user="formData.user"
                :type-errors="v$.type.$errors"
                :duration-errors="v$.duration.$errors"
                :start_at-errors="v$.start_at.$errors"
                :user-errors="v$.user.$errors"
            />
            <div class="row q-mt-sm">
                <div class="col">
                    <q-btn
                        color="primary"
                        @click="openProducts"
                    >
                        <q-icon
                            name="shopping_bag"
                            size="2em"
                            left
                        />
                        Produtos/Serviços
                    </q-btn>
                </div>
            </div>
            <div class="row q-py-sm">
                <div class="col">
                    <base-input
                        v-model="formData.description"
                        type="textarea"
                        placeholder="Observação"
                    />
                </div>
            </div>
            <div class="row">
                <q-btn
                    v-if="showSaveButton"
                    color="primary"
                    type="submit"
                    form="schedule-form"
                    :loading="isSubmiting"
                    :disable="isSubmiting"
                >
                    Salvar
                </q-btn>
            </div>
        </form>
    </transition>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import ScheduleClientForm from 'src/features/schedule/components/ScheduleClientForm.vue'
import { ScheduleFormData, AddProductsFormData } from 'src/features/schedule/models/ScheduleForm'
import ScheduleServiceForm from 'src/features/schedule/components/ScheduleServiceForm.vue'
import { format, parse } from 'date-fns'
import InfoBanner from 'src/features/schedule/components/InfoBanner.vue'
import ScheduleService from 'src/features/schedule/services/ScheduleService'
import { required, helpers } from '@vuelidate/validators'
import { dateFormat } from 'src/utils/validators'
import useVuelidate from '@vuelidate/core'
import BaseInput from 'components/Input/BaseInput.vue'
import { notifyNegative, notifyPositive } from 'src/utils/NotifyHelper'
import axios from 'axios'
import { ApiErrors } from 'src/models/ApiModels'
import AddProductsForm from 'src/features/schedule/components/AddProductsForm.vue'

const props = defineProps({
    showSaveButton: {
        type: Boolean,
        default: false
    },
    id: {
        type: Number,
    },
    initialFormData: {
        type: Object,
    }
})

interface Emits {
    (event: 'submiting'): void
    (event: 'error'): void
    (event: 'success'): void
}
const emit = defineEmits<Emits>()

const formData: ScheduleFormData = reactive({
    client: null,
    pet: null,
    type: null,
    duration: 30,
    start_at: format(new Date(), 'dd/MM/yyyy HH:mm'),
    user: null,
    description: null,
    products: [],
    ...props.initialFormData,
})
const isSubmiting = ref(false)
const requiredWithMessage = helpers.withMessage('Campo obrigatório', required)
const formRules = {
    client: { requiredWithMessage },
    pet: { requiredWithMessage },
    type: { requiredWithMessage },
    duration: { requiredWithMessage },
    start_at: { requiredWithMessage, dateFormat: dateFormat('dd/MM/yyyy HH:mm') },
    user: { requiredWithMessage }
}

const v$ = useVuelidate<ScheduleFormData>(formRules, formData)

async function handleSubmit() {
    v$.value.$touch()
    const valid = await v$.value.$validate()
    if (!valid) {
        return
    }
    try {
        const { client, pet, user, type, start_at, ...rest } = formData
        const parsedStartAt = parse(start_at, 'dd/MM/yyyy HH:mm', new Date())
        const data = {
            client_id: client?.value,
            pet_id: pet?.value,
            user_id: user?.value,
            type: type?.value,
            start_at: format(parsedStartAt, 'yyyy-MM-dd HH:mm:ss'),
            ...rest
        }
        isSubmiting.value = true
        emit('submiting')
        if (!props.id) {
            await ScheduleService.create(data)
            notifyPositive('Agendamento cadastrado com sucesso!')
        } else {
            await ScheduleService.edit(props.id, data)
            notifyPositive('Agendamento atualizado com sucesso!')
        }
        emit('success')
    } catch (error: unknown) {
        emit('error')
        if (!axios.isAxiosError(error)) {
            throw error
        }
        let caption
        const responseData: ApiErrors | null = error.response?.data
        if (responseData?.errors) {
            caption = Object.values(responseData.errors).flat().join('<br>')
        }
        notifyNegative('Não foi possível cadastrar agendamento', caption)
    } finally {
        isSubmiting.value = false
    }
}

// Products
const showProducts = ref<boolean>(false)
function openProducts() {
    showProducts.value = true
}
function closeProducts() {
    showProducts.value = false
}

function handleAddProduct(product: AddProductsFormData) {
    formData.products?.push(product)
}
</script>

<style scoped lang="scss">

</style>
