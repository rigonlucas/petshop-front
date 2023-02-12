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
            <div class="col">
                <base-select
                    label="Tipo"
                    :model-value="String(formData.type)"
                    @input="handleTypeChange"
                    :options="typeOptions"
                    :error-msg="v$.type.$errors[0]?.$message"
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
    ProductModel, ProductTypes,
    ProductTypesLabels,
} from 'src/modules/products/models/ProductModel'
import BaseInput from 'components/Input/BaseInput.vue'
import BaseSelect from 'components/Select/BaseSelect.vue'
import useConvertLabelMapToOptions from 'src/composables/select/useConvertLabelMapToOptions'
import InputMoney from 'components/Input/InputMoney.vue'
import ProductService from 'src/modules/products/services/ProductService'
import axios from 'axios'
import { notifyNegative, notifyPositive } from 'src/utils/NotifyHelper'
import { ProductFormData } from 'src/modules/products/models/ProductFormData'
import { useValidations } from 'src/modules/products/composables/productForm'

const props = defineProps<{
    id?: number,
    initialFormData?: ProductFormData,
}>()

interface Emits {
    (event: 'submiting'): void
    (event: 'error'): void
    (event: 'success', value: ProductModel): void
}
const emit = defineEmits<Emits>()

const formData = reactive<ProductFormData>(props.initialFormData || {})

const typeOptions = useConvertLabelMapToOptions(ProductTypesLabels)

const v$ = useValidations(formData)

function handleTypeChange(value: string) {
    formData.type = parseInt(value)
}

const isLoading = ref<boolean>(false)
async function handleSubmit() {
    v$.value.$touch()
    const valid = await v$.value.$validate()
    if (!valid) {
        return
    }

    try {
        isLoading.value = true
        let product = null
        if (props.id) {
            product = await ProductService.update(props.id, formData)
            notifyPositive('Produto atualizado com sucesso')
        } else {
            product = await ProductService.create(formData)
            notifyPositive('Produto cadastrado com sucesso')
        }

        emit('success', product)
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
