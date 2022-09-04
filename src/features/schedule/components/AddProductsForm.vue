<template>
    <div>
        <div class="row">
            <div class="col">
                <q-btn
                    class="q-ma-sm"
                    color="primary"
                    @click="goBack"
                >
                    <q-icon
                        name="arrow_back"
                    />
                    Voltar
                </q-btn>
            </div>
        </div>
        <div class="row q-mb-sm q-col-gutter-sm">
            <div class="col-12 col-md-5">
                <base-async-select
                    label="Seleciona o produto"
                    v-model:model-value="formData.product"
                    @update:model-value="handleSetProduct"
                    :fetch-callback="fetchProductsCallback"
                    :error-msg="v$.product.$errors[0]?.$message"
                />
            </div>
            <div class="col-12 col-md-2">
                <base-input
                    label="Quantidade"
                    v-model="formData.quantity"
                    type="number"
                    :error-msg="v$.quantity.$errors[0]?.$message"
                />
            </div>
            <div class="col-12 col-md-2">
                <input-money
                    label="Preço"
                    v-model="formData.price"
                    :error-msg="v$.price.$errors[0]?.$message"
                />
            </div>
            <div class="col-12 col-md-2">
                <base-input
                    label="Desconto"
                    v-model.number="formData.discount"
                    type="number"
                    max="100"
                    min="0"
                >
                    <template #prepend>
                        <span>%</span>
                    </template>
                </base-input>
            </div>

            <div class="col-12 col-md-1" style="display: grid;">
                <q-btn
                    color="primary"
                    class="q-mb-sm"
                    @click="handleAddProduct"
                >
                    <q-icon name="add" />
                </q-btn>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <q-table
                    :columns="productsTableColumns"
                    :rows="props.products"
                    :rows-per-page-options="[0]"
                >
                    <template #body-cell-name="{ row }: { row: AddProductsFormData }">
                        <q-td>
                            {{ row.product.name }}
                        </q-td>
                    </template>
                    <template #body-cell-quantity="{ row }: { row: AddProductsFormData }">
                        <q-td class="text-center" auto-width>
                            {{ row.quantity }}
                        </q-td>
                    </template>
                    <template #body-cell-price="{ row }: { row: AddProductsFormData }">
                        <q-td auto-width>
                            {{ formatCurrency(row.price) }}
                        </q-td>
                    </template>
                    <template #body-cell-discount="{ row }: { row: AddProductsFormData }">
                        <q-td auto-width>
                            {{ row.discount || 0 }}%
                        </q-td>
                    </template>
                    <template #body-cell-actions="props">
                        <q-td auto-width>
                            <q-btn
                                color="red"
                                dense
                                @click="removeProduct(props)"
                            >
                                <q-icon name="delete" />
                            </q-btn>
                        </q-td>
                    </template>
                    <template #no-data>Nenhum produto</template>
                </q-table>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import BaseAsyncSelect from 'src/components/Select/BaseAsyncSelect.vue'
import { defineEmits, defineProps, reactive } from 'vue'
import ProductService from 'src/features/products/services/ProductService'
import BaseInput from 'components/Input/BaseInput.vue'
import InputMoney from 'components/Input/InputMoney.vue'
import { DetailedSelectOption } from 'src/composables/select/useSelectAjaxOptions'
import { ProductModel } from 'src/features/products/models/ProductModel'
import useVuelidate from '@vuelidate/core'
import { helpers, required } from '@vuelidate/validators'
import { AddProductsFormData } from 'src/features/schedule/models/ScheduleForm'
import { formatCurrency } from 'src/utils/CurrencyHelper'
import ScheduleService from 'src/features/schedule/services/ScheduleService'
import axios from 'axios'
import { notifyNegative, notifyPositive } from 'src/utils/NotifyHelper'

interface Props {
    scheduleId?: number
    products: AddProductsFormData[]
}
const props = defineProps<Props>()

interface Emits {
    (event: 'go-back'): void
    (event: 'update:products', value: AddProductsFormData[]): void
}
const emit = defineEmits<Emits>()

function goBack() {
    emit('go-back')
}

const formData = reactive<{
    product: DetailedSelectOption<ProductModel>|null,
    quantity: number|null,
    price: number|null,
    discount: number|null,
}>({
    product: null,
    quantity: 1,
    price: null,
    discount: null,
})

function handleSetProduct(selectedProductOption: DetailedSelectOption<ProductModel>) {
    if (!selectedProductOption) {
        formData.product = null
        return
    }
    formData.product = selectedProductOption
    formData.price = selectedProductOption.details.price
}

const fetchProductsCallback = async (input:string, cursor: string) => {
    return await ProductService.list({ name: input, cursor })
}

const requiredWithMessage = helpers.withMessage('Campo obrigatório', required)
const formRules = {
    product: { requiredWithMessage },
    quantity: { requiredWithMessage },
    price: { requiredWithMessage },
}
const v$ = useVuelidate(formRules, formData)

async function handleAddProduct() {
    v$.value.$touch()
    const valid = await v$.value.$validate()
    if (!valid || !formData.product) {
        return
    }

    const emitFormData: AddProductsFormData = {
        product_id: formData.product.details.id,
        product: formData.product.details,
        quantity: formData.quantity,
        price: formData.price,
        discount: formData.discount,
    }

    if (props.scheduleId) {
        try {
            const scheduleProduct = await ScheduleService.addProduct(props.scheduleId, emitFormData)
            console.log(scheduleProduct)
            notifyPositive('Produto adicionado com sucesso')
            emitFormData.id = scheduleProduct.id
        } catch (error) {
            if (!axios.isAxiosError(error)) {
                throw error
            }

            notifyNegative('Não foi possível adicionar produto', error.message)
            return
        }
    }
    emitProductWithNewProduct(emitFormData)
    v$.value.$reset()
    resetForm()
}

function emitProductWithNewProduct(data: AddProductsFormData) {
    emit('update:products', [...props.products, data])
}

function resetForm() {
    formData.product = null
    formData.quantity = 1
    formData.price = null
    formData.discount = null
}

async function removeProduct(rowProps: any) {
    const productsClone = [...props.products]
    if (props.scheduleId && rowProps.row.id) {
        try {
            await ScheduleService.removeProduct(props.scheduleId, rowProps.row.id)
            notifyPositive('Produto removido com sucesso')
        } catch (error) {
            if (!axios.isAxiosError(error)) {
                throw error
            }

            notifyNegative('Não foi possível remover registro', error.message)
            return
        }
    }
    productsClone.splice(rowProps.rowIndex, 1)
    emit('update:products', productsClone)
}

// List table
const productsTableColumns = [
    {
        name: 'name',
        label: 'Nome',
        align: 'left',
    },
    {
        name: 'quantity',
        label: 'Quantidade',
        field: 'quantity',
    },
    {
        name: 'price',
        label: 'Preço',
        field: 'price',
    },
    {
        name: 'discount',
        label: 'Desconto',
    },
    {
        name: 'actions',
        label: 'Ações',
    }
]
</script>

<style scoped>

</style>
