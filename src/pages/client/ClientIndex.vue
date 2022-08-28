<template>
    <div class="q-pa-lg">
        <q-table
            title="Clientes"
            dense
            row-key="name"
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
                         v-model="clientName"
                         placeholder="Pesquisa por nome"
                         @keyup="keyUpFetchClientsByName"
                >
                    <template v-slot:append>
                        <q-btn flat rounded icon="search" @click="fetchClientsByName"></q-btn>
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
import ClientService from 'src/features/client/services/ClientService'
import { ClientModel } from 'src/features/client/models/ClientModel'

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
        name: 'email',
        label: 'Email',
        field: 'email',
        align: 'left',
        sortable: false,
    },
    {
        name: 'phone',
        label: 'Contato',
        field: 'phone',
        align: 'left',
        sortable: false,
    },
    {
        name: 'pets',
        align: 'left',
        label: 'Pets',
        field: 'pets',
        // format: (val: PetModel[]) => val.map(pet => pet.name).join(', '),
        sortable: false,
    },
    {
        name: 'options',
        align: 'left',
        label: 'Opções',
        field: 'options',
        sortable: false,
        headerStyle: 'width: 230px',
    },
]

const rows = ref<ClientModel[]>([])
const clientName = ref<string|null>(null)
const isLoading = ref<boolean>(true)

async function fetchClients(page: number, per_page: number, name: string | null = null) {
    console.log(isLoading.value)
    isLoading.value = true
    const response = (await ClientService.list({
        include: ['pets', 'pets.breed'],
        page: page,
        per_page: per_page,
        name: name,
    }))
    isLoading.value = false
    return response
}

function keyUpFetchClientsByName (e: KeyboardEvent) {
    if (e.keyCode === 13 && typeof clientName.value === 'string') {
        fetchClientsByName()
        return true
    }
    if (e.keyCode === 8 && clientName.value?.length === 0) {
        fetchClientsByName()
        return true
    }
}

async function fetchClientsByName() {
    const response = await fetchClients(pagination.value.page, pagination.value.rowsPerPage, clientName.value)
    rows.value = response.data
    pagination.value.page = response.meta.current_page
    pagination.value.rowsPerPage = response.meta.per_page
    pagination.value.rowsNumber = response.meta.total
}

const handlerRequest = async(props: any) => {
    const response = await fetchClients(
        props.pagination ? props.pagination.page : props.page,
        props.pagination ? props.pagination.rowsPerPage : props.rowsPerPage,
    )
    rows.value = response.data
    pagination.value.page = response.meta.current_page
    pagination.value.rowsPerPage = response.meta.per_page
    pagination.value.rowsNumber = response.meta.total
}
</script>
