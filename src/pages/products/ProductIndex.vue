<template>
    <div class="q-pa-lg">
        <q-table
            title="Produtos"
            row-key="name"
            dense
            :rows="rows"
            :columns="columns"
            :rows-per-page-options="[10, 20, 30, 50]"
            :pagination="pagination"
            :loading="isLoading"
            @request="handlerRequest"
            @update:pagination="handlerRequest"
        >
            <template v-slot:loading>
                <q-inner-loading showing color="primary" />
            </template>
            <template v-slot:top-right>
                <q-input dense
                         debounce="300"
                         v-model="productName"
                         placeholder="Nome do produto"
                         @keyup="keyUpFetchProductsByName"
                >
                    <template v-slot:append>
                        <q-btn flat rounded icon="search" @click="fetchProductsByName"></q-btn>
                    </template>
                </q-input>
            </template>
            <template #body-cell-type="{ row }: { row:ProductModel }">
                <q-td class="text-center">
                    {{ findProductEnum(row.type) }}
                </q-td>
            </template>
            <template #body-cell-measurement_unit="{ row }: { row:ProductModel }">
                <q-td class="text-center">
                    {{ findProductUnitEnum(row.measurement_unit) }}
                </q-td>
            </template>
            <template #body-cell-percentage="{ row }: { row: ProductModel }">
                <q-td class="text-center">
                    {{ percentage = productProfit(row.cost, row.price) }}%
                    <q-badge color="red" rounded v-if="percentage >= 0 && percentage <= 15">
                        <q-tooltip class="bg-red" :offset="[10, 10]">
                            Lucro baixo
                        </q-tooltip>
                    </q-badge>
                    <q-badge color="blue" rounded v-else-if="percentage > 25 && percentage <= 35">
                        <q-tooltip class="bg-blue" :offset="[10, 10]">
                            Lucro mediano
                        </q-tooltip>
                    </q-badge>
                    <q-badge color="green" rounded v-else>
                        <q-tooltip class="bg-green" :offset="[10, 10]">
                            Lucro acima de 35%
                        </q-tooltip>
                    </q-badge>
                </q-td>
            </template>
            <template #body-cell-options="{ row }: { row: ProductModel }">
                <q-td :id="row.id">
                    <div class="row">
                        <div class="col">
                            <q-btn
                                color="primary"
                                size="xs"
                                icon="visibility"
                            />
                        </div>
                        <div class="col">
                            <q-btn
                                color="warning"
                                size="xs"
                                icon="edit"
                            />
                        </div>
                        <div class="col">
                            <q-btn
                                color="red"
                                size="xs"
                                icon="delete"
                            />
                        </div>
                    </div>
                </q-td>
            </template>
        </q-table>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import ProductService from 'src/features/products/services/ProductService'
import { ProductModel } from 'src/features/products/models/ProductModel'
import currency from 'currency.js'
import { findProductEnum } from 'src/enums/ProductsEnum'
import { findProductUnitEnum } from 'src/enums/ProductsUnitEnum'

const pagination = ref({
    page: 1,
    rowsPerPage: 20,
    rowsNumber: 0,
})
const columns = [
    {
        name: 'name',
        label: 'Nome',
        align: 'left',
        field: 'name',
        sortable: false,
    },
    {
        name: 'type',
        label: 'Tipo',
        field: 'type',
        align: 'center',
        headerStyle: 'width: 100px',
        sortable: false,
    },
    {
        name: 'measurement_unit',
        label: 'Unidade',
        field: 'measurement_unit',
        align: 'center',
        headerStyle: 'width: 100px',
        sortable: false,
    },
    {
        name: 'cost',
        label: 'Custo',
        field: 'cost',
        align: 'center',
        format: (cost: number) => cost.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }),
        sortable: false,
        headerStyle: 'width: 100px'
    },
    {
        name: 'price',
        align: 'center',
        label: 'Preço',
        field: 'price',
        format: (price: number) => price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }),
        sortable: false,
        headerStyle: 'width: 100px',
    },
    {
        name: 'percentage',
        align: 'center',
        label: 'Porcentagem',
        field: 'percentage',
        headerStyle: 'width: 100px',
        sortable: false,
    },
    {
        name: 'options',
        align: 'center',
        label: 'Opções',
        field: 'options',
        sortable: false,
        headerStyle: 'width: 230px',
    },
]

const isLoading = ref<boolean>(true)

const rows = ref<ProductModel[]>([])
const productName = ref<string|null>(null)

async function fetchProducts(page: number, per_page: number, name: string | null = null) {
    isLoading.value = true
    const response = (await ProductService.list({
        page,
        per_page,
        name,
    }))
    isLoading.value = false
    return response
}

function keyUpFetchProductsByName (e: KeyboardEvent) {
    console.log(e.keyCode)
    if (e.keyCode === 13 && typeof productName.value === 'string') {
        fetchProductsByName()
        return true
    }
    if (e.keyCode === 8 && productName.value?.length === 0) {
        fetchProductsByName()
        return true
    }
}

async function fetchProductsByName() {
    const response = await fetchProducts(pagination.value.page, pagination.value.rowsPerPage, productName.value)
    rows.value = response.data
    pagination.value.page = response.meta.current_page
    pagination.value.rowsPerPage = response.meta.per_page
    pagination.value.rowsNumber = response.meta.total
}

const handlerRequest = async(props: any) => {
    const response = await fetchProducts(
        props.pagination ? props.pagination.page : props.page,
        props.pagination ? props.pagination.rowsPerPage : props.rowsPerPage,
    )
    rows.value = response.data
    pagination.value.page = response.meta.current_page
    pagination.value.rowsPerPage = response.meta.per_page
    pagination.value.rowsNumber = response.meta.total
}

function productProfit (cost: number, price: number): string {
    return (((cost * 100) / price - 100) * -1).toFixed(0)
}
</script>
