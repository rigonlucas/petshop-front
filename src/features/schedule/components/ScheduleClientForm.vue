<template>
    <q-select
        :model-value="props.client"
        @update:model-value="emit('update:client', $event)"
        label="Cliente"
        :options="clientOptions"
        outlined
        use-input
        input-debounce="200"
        @filter="handleFilterClient"
    />
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import ClientService from 'src/features/client/services/ClientService'
import { QSelectOption } from 'quasar'
import useSelectAjaxOptions from 'src/composables/useSelectAjaxOptions'

interface Props {
    client?: QSelectOption
}
const props = defineProps<Props>()
export interface Emits {
    (event: 'update:client', value: QSelectOption): void
}
const emit = defineEmits<Emits>()

const { handleFilter: handleFilterClient, options: clientOptions } = useSelectAjaxOptions(ClientService.list)
</script>
