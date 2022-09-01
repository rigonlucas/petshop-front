<template>
    <div class="q-pa-lg">
        <q-table
            title="Produtos"
            row-key="name"
            :rows="data"
            :columns="columns"
            :loading="isLoading"
            :rows-per-page-options="[0]"
        >
            <template v-slot:loading>
                <q-inner-loading showing color="primary"/>
            </template>
            <template v-slot:top-right>
                <q-input
                    v-model="productName"
                    placeholder="Nome do produto"
                    :debounce="300"
                >
                    <template v-slot:append>
                        <q-icon name="search" />
                    </template>
                </q-input>
            </template>
            <template #body-cell-type="{ row }: { row: ProductModel }">
                <q-td class="text-center">
                    {{ findProductEnum(row.type) }}
                </q-td>
            </template>
            <template #body-cell-measurement_unit="{ row }: { row: ProductModel }">
                <q-td class="text-center">
                    {{ findProductUnitEnum(row.measurement_unit) }}
                </q-td>
            </template>
            <template #body-cell-percentage="{ row }: { row: ProductModel }">
                <q-td class="text-center">
                    {{ calcProductProfit(row.cost, row.price) }}%
                </q-td>
            </template>
            <template #body-cell-options="{ row }: { row: ProductModel }">
                <q-td :id="row.id">
                    <div class="flex">
                        <q-btn
                            color="primary"
                            size="xs"
                            icon="visibility"
                        />
                        <q-btn
                            color="warning"
                            size="xs"
                            icon="edit"
                        />
                        <q-btn
                            color="red"
                            size="xs"
                            icon="delete"
                        />
                    </div>
                </q-td>
            </template>
            <template #pagination>
                <q-btn
                    icon="chevron_left"
                    color="grey-8"
                    round
                    dense
                    flat
                    :disable="!hasPreviousPage"
                    @click="fetchPreviousPage"
                />
                <q-btn
                    icon="chevron_right"
                    color="grey-8"
                    round
                    dense
                    flat
                    :disable="!hasNextPage"
                    @click="fetchNextPage"
                />
            </template>
        </q-table>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import ProductService from 'src/features/products/services/ProductService'
import { ProductModel } from 'src/features/products/models/ProductModel'
import { findProductEnum } from 'src/enums/ProductsEnum'
import { findProductUnitEnum } from 'src/enums/ProductsUnitEnum'
import { notifyNegative } from 'src/utils/Notify'
import usePaginatedResourceListing from 'src/composables/fetch/usePaginatedResourceListing'
import { formatCurrency } from 'src/utils/CurrencyHelper'

const columns = [
    {
        name: 'name',
        label: 'Nome',
        align: 'left',
        field: 'name',
    },
    {
        name: 'type',
        label: 'Tipo',
        field: 'type',
        align: 'center',
        headerStyle: 'width: 100px',
    },
    {
        name: 'measurement_unit',
        label: 'Unidade',
        field: 'measurement_unit',
        align: 'center',
        headerStyle: 'width: 100px',
    },
    {
        name: 'cost',
        label: 'Custo',
        field: 'cost',
        align: 'center',
        format: (cost: number) => formatCurrency(cost),
        headerStyle: 'width: 100px',
    },
    {
        name: 'price',
        align: 'center',
        label: 'Preço',
        field: 'price',
        format: (price: number) => formatCurrency(price),
        headerStyle: 'width: 100px',
    },
    {
        name: 'percentage',
        align: 'center',
        label: 'Porcentagem',
        field: 'percentage',
        headerStyle: 'width: 100px',
    },
    {
        name: 'options',
        align: 'center',
        label: 'Opções',
        field: 'options',
        headerStyle: 'width: 230px',
    },
]

const productName = ref<string | null>(null)
watch(productName, async () => await fetchData())

const {
    fetchData,
    fetchNextPage,
    fetchPreviousPage,
    hasPreviousPage,
    hasNextPage,
    data,
    isLoading,
} = await usePaginatedResourceListing<ProductModel>(async (cursor?: string) => {
    return await ProductService.list({
        cursor,
        name: productName.value,
    })
},
(error) => notifyNegative(error.response && error.response.data.message)
)

function calcProductProfit(cost: number, price: number): number {
    if (price < 0) {
        return 0
    }
    return Math.round(((cost * 100) / price - 100) * -1)
}
</script>
