<template>
    <q-select
        outlined
        use-input
        hide-bottom-space
        input-debounce="200"
        @filter="handleFilter"
        @virtual-scroll="handleOnScroll"
        :loading="isLoading"
        :options="options"
        :error="!!errorMsg"
        :error-message="errorMsg"
        v-bind="$attrs"
    >
        <template #no-option="scope">
            <slot name="no-option" v-bind="scope">
                <q-item style="align-items: center;">
                    Nenhum registro encontrado
                </q-item>
            </slot>
        </template>

        <template #option="scope">
            <slot name="option" v-bind="scope">
                <q-item v-bind="scope.itemProps" style="align-items: center;">
                    {{ scope.label }}
                </q-item>
            </slot>
        </template>

        <template #prepend>
            <slot name="prepend" />
        </template>
        <template #append>
            <slot name="append" />
        </template>

        <template #error>
            <div v-for="error in errors" :key="error">{{ error }}</div>
        </template>
    </q-select>
</template>

<script lang="ts">
export default {
    inheritAttrs: false
}
</script>
<script setup lang="ts">
import { defineProps } from 'vue/dist/vue'
import { QSelectProps } from 'quasar'
import useSelectAjaxOptions from 'src/composables/select/useSelectAjaxOptions'
import { PaginatedServerResponse } from 'src/models/ApiModels'

interface Props extends QSelectProps {
    fetchCallback: (input: string, cursor: string|null) => Promise<PaginatedServerResponse<any>>
    errorMsg?: string
}
const props = defineProps<Props>()

const {
    options,
    handleFilter,
    handleOnScroll,
    isLoading,
} = useSelectAjaxOptions<any>(props.fetchCallback)

</script>

<style scoped>

</style>
