<template>
    <div>
        <div class="row">
            <div class="col q-pb-sm">
                <q-btn
                    type="button"
                    color="primary"
                    icon="add"
                    :to="{ name: 'product.create' }"
                >
                    Adicionar
                </q-btn>
            </div>
        </div>
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
                    {{ ProductTypesLabels[row.type] }}
                </q-td>
            </template>
            <template #body-cell-percentage="{ row }: { row: ProductModel }">
                <q-td class="text-center">
                    {{ calcProductProfit(row.cost, row.price) }}%
                </q-td>
            </template>
            <template #body-cell-actions="{ row }: { row: ProductModel }">
                <q-td auto-width>
                    <q-btn
                        color="warning"
                        size="xs"
                        icon="edit"
                        @click="redirectToEdit(row)"
                    />
                    <q-btn
                        color="red"
                        size="xs"
                        icon="delete"
                        @click="handleDelete(row)"
                    />
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
import { ProductModel, ProductTypesLabels } from 'src/features/products/models/ProductModel'
import { notifyNegative, notifyPositive } from 'src/utils/NotifyHelper'
import usePaginatedResourceListing from 'src/composables/fetch/usePaginatedResourceListing'
import { formatCurrency } from 'src/utils/CurrencyHelper'
import { useRouter } from 'vue-router'
import DeleteProduct from 'pages/products/components/DeleteProduct.vue'
import DialogHelper from 'src/utils/DialogHelper'
import axios from 'axios'

const router = useRouter()

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
        name: 'actions',
        align: 'center',
        label: 'Ações',
        field: 'actions',
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
} = await usePaginatedResourceListing<ProductModel>(async (cursor?: string|null) => {
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

function redirectToEdit(row: ProductModel) {
    router.push({ name: 'product.edit', params: { id: row.id } })
}

async function handleDelete(product: ProductModel) {
    const confirm = await DialogHelper.confirm(product.name, 'Remover produto?')
    if (!confirm) {
        return
    }

    try {
        await ProductService.remove(product.id)
        notifyPositive('Produto excluído')
        await fetchData()
    } catch (error: unknown) {
        if (!axios.isAxiosError(error)) {
            throw error
        }
        notifyNegative(error.response && error.response.data.message)
    }
}
</script>
