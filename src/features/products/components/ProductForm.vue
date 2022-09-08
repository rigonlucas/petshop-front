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
                    label="Descrição"
                    type="textarea"
                    placeholder="Descreva o produto"
                    v-model:model-value="formData.description"
                />
            </div>
        </div>
        <div class="row q-py-sm q-col-gutter-sm">
            <div class="col col-md-6">
                <base-select
                    label="Tipo"
                    v-model:model-value="formData.type"
                    :options="typeOptions"
                    :error-msg="v$.type.$errors[0]?.$message"
                />
            </div>
            <div class="col col-md-6">
                <base-select
                    label="Unidade de medida"
                    v-model:model-value="formData.measurement_unit"
                    :options="unitsOptions"
                />
            </div>
        </div>
        <div class="row q-py-sm q-col-gutter-sm">
            <div class="col col-md-6">
                <input-money
                    label="Custo"
                    v-model="formData.cost"
                />
            </div>
            <div class="col col-md-6">
                <input-money
                    label="Preço"
                    v-model="formData.price"
                    :error-msg="v$.name.$errors[0]?.$message"
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
import {
    ProductModel,
    ProductTypes,
    ProductTypesLabels,
    ProductMeasurementUnit, ProductMeasurementUnitLabels,
} from 'src/features/products/models/ProductModel'
import BaseInput from 'components/Input/BaseInput.vue'
import { QSelectOption } from 'quasar'
import BaseSelect from 'components/Select/BaseSelect.vue'
import useLabelToOptions from 'src/composables/select/useLabelToOptions'
import InputMoney from 'components/Input/InputMoney.vue'
import useVuelidate from '@vuelidate/core'
import { helpers, required } from '@vuelidate/validators'
import ProductService from 'src/features/products/services/ProductService'
import axios from 'axios'
import { notifyNegative, notifyPositive } from 'src/utils/NotifyHelper'

interface ProductFormData {
    name?: string|null
    description?: string|null
    type?: QSelectOption<number>|null
    cost?: number|null
    price?: number|null
    measurement_unit?: QSelectOption<number>|null
}

const props = defineProps<{
    id?: number,
    initialFormData?: ProductModel
}>()

interface Emits {
    (event: 'submiting'): void
    (event: 'error'): void
    (event: 'success'): void
}
const emit = defineEmits<Emits>()

const formData = reactive<ProductFormData>({
    name: props.initialFormData?.name || '',
    description: props.initialFormData?.description || '',
    type: {
        label: ProductTypesLabels[props.initialFormData?.type || ProductTypes.PRODUCT],
        value: props.initialFormData?.type || ProductTypes.PRODUCT
    },
    cost: props.initialFormData?.cost || null,
    price: props.initialFormData?.price || null,
    measurement_unit: {
        label: ProductMeasurementUnitLabels[props.initialFormData?.measurement_unit || ProductMeasurementUnit.UN],
        value: props.initialFormData?.measurement_unit || ProductMeasurementUnit.UN
    },
})

const typeOptions = useLabelToOptions(ProductTypesLabels)
const unitsOptions = useLabelToOptions(ProductMeasurementUnitLabels)

const requiredWithMessage = helpers.withMessage('Campo obrigatório', required)
const formRules = {
    name: { requiredWithMessage },
    type: { requiredWithMessage },
    price: { requiredWithMessage },
}
const v$ = useVuelidate<ProductFormData>(formRules, formData)

const isLoading = ref<boolean>(false)
async function handleSubmit() {
    v$.value.$touch()
    console.log('aaa')
    const valid = await v$.value.$validate()
    if (!valid) {
        return
    }
    const submitData = {
        name: formData.name,
        description: formData.description,
        type: formData.type?.value,
        measurement_unit: formData.measurement_unit?.value,
        cost: formData.cost,
        price: formData.price,
    }
    try {
        isLoading.value = true
        if (props.id) {
            await ProductService.update(props.id, submitData)
            notifyPositive('Produto atualizado com sucesso')
        } else {
            await ProductService.create(submitData)
            notifyPositive('Produto cadastrado com sucesso')
        }

        emit('success')
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
