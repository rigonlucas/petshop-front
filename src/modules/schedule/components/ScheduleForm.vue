<template>
    <transition-group enter-active-class="animated fadeIn">
        <add-products-form
            v-if="showProducts"
            v-model:products="formData.products"
            @add-product="handleAddProduct"
            @go-back="closeProducts"
            :schedule-id="props.id"
        />
        <add-vaccine-form
            v-else-if="showVaccines"
            v-model:vaccines="formData.vaccines"
            @go-back="closeVaccines"
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
                        class="q-mr-md"
                        color="primary"
                        @click="openProducts"
                    >
                        <q-icon
                            name="shopping_bag"
                            size="2em"
                            left
                        />
                        Produtos/Serviços
                        <q-badge
                            v-if="formData.products.length > 0"
                            rounded
                            floating
                            color="red-10"
                        >
                            {{ formData.products.length }}
                        </q-badge>
                    </q-btn>
                    <q-btn
                        class="q-mr-md"
                        color="primary"
                        @click="openVaccines"
                    >
                        <q-icon
                            name="vaccines"
                            size="2em"
                            left
                        />
                        Vacinas
                        <q-badge
                            v-if="formData.vaccines.length > 0"
                            rounded
                            floating
                            color="red-10"
                        >
                            {{ formData.vaccines.length }}
                        </q-badge>
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
    </transition-group>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import ScheduleClientForm from 'src/modules/schedule/components/ScheduleClientForm.vue'
import { ScheduleFormData, AddProductsFormData, AddVaccinesFormData } from 'src/modules/schedule/models/ScheduleForm'
import ScheduleServiceForm from 'src/modules/schedule/components/ScheduleServiceForm.vue'
import { format, parse, parseISO } from 'date-fns'
import InfoBanner from 'src/modules/schedule/components/InfoBanner.vue'
import ScheduleService from 'src/modules/schedule/services/ScheduleService'
import { required, helpers } from '@vuelidate/validators'
import { dateFormat } from 'src/utils/validators'
import useVuelidate from '@vuelidate/core'
import BaseInput from 'components/Input/BaseInput.vue'
import { notifyNegative, notifyPositive } from 'src/utils/NotifyHelper'
import axios from 'axios'
import { ApiErrors } from 'src/models/ApiModels'
import AddProductsForm from 'src/modules/schedule/components/AddProductsForm.vue'
import { ScheduleModel, ScheduleTypesLabels } from 'src/modules/schedule/models/ScheduleModel'
import { toDetailedSelectOption } from 'src/utils/ModelToSelectOption'
import { ClientModel } from 'src/modules/client/models/ClientModel'
import { PetModel } from 'src/modules/pet/models/PetModel'
import UserModel from 'src/modules/user/models/UserModel'
import AddVaccineForm from 'src/modules/schedule/components/AddVaccineForm.vue'

interface Props {
    id: number
    schedule?: ScheduleModel
}
const props = defineProps<Props>()

interface Emits {
    (event: 'submiting'): void
    (event: 'error'): void
    (event: 'success'): void
}
const emit = defineEmits<Emits>()

const formData: ScheduleFormData = reactive({
    client: toDetailedSelectOption<ClientModel>(props.schedule?.client),
    pet: toDetailedSelectOption<PetModel>(props.schedule?.pet),
    type: !props.schedule ? null : {
        label: ScheduleTypesLabels[props.schedule.type],
        value: props.schedule.type,
        details: props.schedule.type
    },
    duration: props.schedule?.duration || 30,
    start_at: (props.schedule && format(parseISO(props.schedule.start_at), 'dd/MM/yyyy HH:mm')) || format(new Date(), 'dd/MM/yyyy HH:mm'),
    user: toDetailedSelectOption<UserModel>(props.schedule?.user),
    description: props.schedule?.description || null,
    products: props.schedule?.hasProducts || [],
    vaccines: props.schedule?.hasVaccines || []
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

// Vaccines
const showVaccines = ref<boolean>(false)
function openVaccines() {
    showVaccines.value = true
}
function closeVaccines() {
    showVaccines.value = false
}

function handleAddVaccine(vaccine: AddVaccinesFormData) {
    formData.vaccines?.push(vaccine)
}
</script>

<style scoped lang="scss">

</style>
