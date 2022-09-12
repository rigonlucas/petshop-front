<template>
    <div>
        <div class="row">
            <div class="col q-pb-sm">
                <q-btn
                    type="button"
                    color="primary"
                    icon="add"
                    :to="{ name: 'client.create' }"
                >
                    Adicionar
                </q-btn>
            </div>
        </div>
        <q-table
            title="Clientes"
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
                    v-model="clientName"
                    placeholder="Nome do cliente"
                    :debounce="300"
                >
                    <template v-slot:append>
                        <q-icon name="search" />
                    </template>
                </q-input>
            </template>
            <template #body-cell-pets="{ row }: { row: ClientModel }">
                <q-td v-if=row.pets.length>
                    <template v-for="(pet, key) in row.pets" :key="key">
                        <q-chip color="blue" text-color="white" size="sm">
                            <q-avatar icon="pets"/>
                            {{ pet.name }}, {{ pet.breed.name }}
                        </q-chip>
                    </template>
                </q-td>
                <q-td class="text-left" v-else>
                    <q-item-label caption>
                        <q-badge color="yellow-6" text-color="black" rounded>
                            <q-icon
                                name="warning"
                            />
                            Sem pets registrados
                        </q-badge>
                    </q-item-label>
                </q-td>
            </template>
            <template #body-cell-options="{ row }: { row: ClientModel }">
                <q-td :id="row.id">
                    <div class="flex">
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
import { notifyNegative, notifyPositive } from 'src/utils/NotifyHelper'
import usePaginatedResourceListing from 'src/composables/fetch/usePaginatedResourceListing'
import { ClientModel } from 'src/features/client/models/ClientModel'
import ClientService from 'src/features/client/services/ClientService'
import DialogHelper from 'src/utils/DialogHelper'
import axios from 'axios'
import { useRouter } from 'vue-router'

const clientName = ref<string | null>(null)
const router = useRouter()
watch(clientName, async () => await fetchData())

const columns = [
    {
        name: 'name',
        label: 'Nome',
        align: 'left',
        field: 'name',
        sortable: false,
    },
    {
        name: 'email',
        label: 'Email',
        field: 'email',
        align: 'left',
        headerStyle: 'width: 250px',
        sortable: false,
    },
    {
        name: 'phone',
        label: 'Contato',
        field: 'phone',
        align: 'left',
        headerStyle: 'width: 150px',
        sortable: false,
    },
    {
        name: 'pets',
        align: 'left',
        label: 'Pets',
        field: 'pets',
        sortable: false,
    },
    {
        name: 'options',
        align: 'left',
        label: 'Opções',
        field: 'options',
        sortable: false,
        headerStyle: 'width: 150px',
    },
]

function redirectToEdit(row: ClientModel) {
    router.push({ name: 'client.edit', params: { id: row.id } })
}

const {
    fetchData,
    fetchNextPage,
    fetchPreviousPage,
    hasPreviousPage,
    hasNextPage,
    data,
    isLoading,
} = await usePaginatedResourceListing<ClientModel>(async (cursor?: string|null) => {
    return await ClientService.list({
        cursor,
        include: ['pets', 'pets.breed'],
        name: clientName.value,
    })
},
(error) => notifyNegative(error.response && error.response.data.message)
)

async function handleDelete(client: ClientModel) {
    const confirm = await DialogHelper.confirm(client.name, 'Remover cliente?', 'red', 'Confirmar')
    if (!confirm) {
        return
    }

    try {
        await ClientService.remove(client.id)
        notifyPositive('Cliente excluído')
        await fetchData()
    } catch (error: unknown) {
        if (!axios.isAxiosError(error)) {
            throw error
        }
        notifyNegative(error.response && error.response.data.message)
    }
}

</script>
