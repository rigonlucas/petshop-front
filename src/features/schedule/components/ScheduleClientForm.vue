<template>
    <div class="row q-col-gutter-sm">
        <div class="col-12 col-md-6">
            <q-select
                :model-value="props.client"
                @update:model-value="handleClientSelect"
                label="Cliente"
                :options="clientsOptions"
                outlined
                use-input
                input-debounce="200"
                @filter="handleClientsFilter"
                @virtual-scroll="handleClientsOnScroll"
                :loading="IsLoadingClients"
                style="flex-grow: 1;"
            >
                <template #no-option>
                    Nenhum cliente encontrado
                </template>
            </q-select>
        </div>
        <div class="col-12 col-md-6">
            <q-select
                :model-value="props.pet"
                @update:model-value="handleSelectPet"
                label="Pet"
                :options="petsOptions"
                outlined
                use-input
                input-debounce="200"
                @filter="handlePetsFilter"
                @virtual-scroll="handlePetsOnScroll"
                :loading="IsLoadingPets"
                style="flex-grow: 1;"
            >
                <template #no-option>
                    <q-item style="align-items: center; justify-content: space-between; gap: 10px;">
                        Nenhum pet encontrado
                    </q-item>
                </template>

                <template #option="scope">
                    <q-item v-bind="scope.itemProps" style="align-items: center; gap: 10px;">
                        <q-item-label>{{ scope.opt.label }}</q-item-label>
                        <q-item-label caption>{{ scope.opt.details.client.name }}</q-item-label>
                    </q-item>
                </template>
            </q-select>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import ClientService from 'src/features/client/services/ClientService'
import useSelectAjaxOptions, { DetailedSelectOption } from 'src/composables/select/useSelectAjaxOptions'
import PetService from 'src/features/pet/services/PetService'
import { ClientModel } from 'src/features/client/models/ClientModel'
import { PetModel } from 'src/features/pet/models/PetModel'

interface Props {
    client?: DetailedSelectOption<ClientModel>
    pet?: DetailedSelectOption<PetModel>
}

const props = defineProps<Props>()

interface Emits {
    (event: 'update:client', value: DetailedSelectOption<ClientModel> | null): void
    (event: 'update:pet', value: DetailedSelectOption<PetModel> | null): void
}

const emit = defineEmits<Emits>()

const {
    handleFilter: handleClientsFilter,
    options: clientsOptions,
    handleOnScroll: handleClientsOnScroll,
    isLoading: IsLoadingClients,
} = useSelectAjaxOptions<ClientModel>(async(input, page) => {
    return await ClientService.list({ name: input, page })
})

const {
    handleFilter: handlePetsFilter,
    options: petsOptions,
    handleOnScroll: handlePetsOnScroll,
    isLoading: IsLoadingPets,
} = useSelectAjaxOptions<ClientModel>(async(input, page) => {
    return await PetService.list({ name: input, client_id: props.client?.value, include: 'client', page })
})

function handleClientSelect(e: DetailedSelectOption<ClientModel> | null) {
    emit('update:client', e)
    emit('update:pet', null)
}

function handleSelectPet(e: DetailedSelectOption<PetModel> | null) {
    if (e?.details?.client) {
        emit('update:client', {
            label: e.details.client.name,
            value: e.details.client.id,
            details: e.details.client
        })
    }

    emit('update:pet', e)
}

</script>
