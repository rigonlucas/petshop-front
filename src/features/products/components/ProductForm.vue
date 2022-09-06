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
                    v-model:model-value="formData.cost"
                />
            </div>
            <div class="col col-md-6">
                <input-money
                    label="Preço"
                    v-model:model-value="formData.price"
                    :error-msg="v$.name.$errors[0]?.$message"
                />
            </div>
        </div>
        <q-btn
            color="primary"
            type="submit"
        >
            Salvar
        </q-btn>
    </form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
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
    cost: props.initialFormData?.cost || 0,
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

async function handleSubmit() {
    v$.value.$touch()
    const valid = await v$.value.$validate()
    if (!valid) {
        return
    }

    await ProductService.create({
        name: formData.name,
        description: formData.description,
        type: formData.type?.value,
        measurement_unit: formData.measurement_unit?.value,
        cost: formData.cost,
        price: formData.price,
    })
}
</script>

<style scoped>

</style>
