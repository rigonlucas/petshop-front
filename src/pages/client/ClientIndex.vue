<template>
    <div class="q-pa-md">
        <q-table
            title="Clientes"
            :rows="rows"
            :columns="columns"
            row-key="name"
        >
            <template #body-cell-pets="{ row }: { row: ClientModel }">
                <q-td v-if=row.pets.length>
                    <template v-for="(pet, key) in row.pets" :key="key">
                        <q-chip color="blue" text-color="white">
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
import { ref, onMounted } from 'vue'
import ClientService from 'src/features/client/services/ClientService'
import { ClientModel } from 'src/features/client/models/ClientModel'

const columns = [
    {
        name: 'name',
        required: true,
        label: 'Nome',
        align: 'left',
        field: 'name',
        sortable: true,
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
    }
]

const rows = ref<ClientModel[]>([])
onMounted(async() => {
    rows.value = (await ClientService.list({
        include: ['pets', 'pets.breed'],
        include_count: ['schedules'],
    })).data
})

</script>
