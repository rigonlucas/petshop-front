<template>
    <div class="row q-col-gutter-sm q-py-sm">
        <div class="col-12 col-md-6">
            <base-async-select
                :model-value="props.client"
                @update:model-value="handleClientSelect"
                label="Cliente*"
                :fetch-callback="fetchClientsCallback"
                :error-msg="clientErrors[0]?.$message || ''"
                style="flex-grow: 1;"
            />
        </div>
        <div class="col-12 col-md-6">
            <base-async-select
                :model-value="props.pet"
                @update:model-value="handleSelectPet"
                label="Pet*"
                :fetch-callback="fetchPetsCallback"
                :error-msg="petErrors[0]?.$message || ''"
                style="flex-grow: 1;"
            >
                <template #option="scope">
                    <q-item v-bind="scope.itemProps" style="align-items: center; gap: 10px;">
                        <q-item-label>{{ scope.opt.label }}</q-item-label>
                        <q-item-label caption>{{ scope.opt.details.client.name }}</q-item-label>
                    </q-item>
                </template>
            </base-async-select>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import ClientService from 'src/modules/client/services/ClientService'
import { DetailedSelectOption } from 'src/composables/select/useSelectAjaxOptions'
import PetService from 'src/modules/pet/services/PetService'
import { ClientModel } from 'src/modules/client/models/ClientModel'
import { PetModel } from 'src/modules/pet/models/PetModel'
import BaseAsyncSelect from 'components/Select/BaseAsyncSelect.vue'
import { ErrorObject } from '@vuelidate/core'

interface Props {
    client?: DetailedSelectOption<ClientModel>
    pet?: DetailedSelectOption<PetModel>
    clientErrors?: ErrorObject[]
    petErrors?: ErrorObject[]
}

const props = defineProps<Props>()

interface Emits {
    (event: 'update:client', value: DetailedSelectOption<ClientModel> | null): void
    (event: 'update:pet', value: DetailedSelectOption<PetModel> | null): void
}

const emit = defineEmits<Emits>()

const fetchClientsCallback = async (input: string, cursor: string) => {
    return await ClientService.list({ name: input, cursor })
}

const fetchPetsCallback = async (input:string, cursor: string) => {
    return await PetService.list({ name: input, client_id: props.client?.value, include: 'client', cursor })
}

function handleClientSelect(e: DetailedSelectOption<ClientModel> | null) {
    emit('update:client', e)
    emit('update:pet', null)
}

function handleSelectPet(e: DetailedSelectOption<PetModel> | null) {
    console.log(e)

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
