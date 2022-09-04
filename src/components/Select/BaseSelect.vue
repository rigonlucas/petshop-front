<template>
    <q-select
        outlined
        use-input
        hide-bottom-space
        input-debounce="0"
        @filter="handleFilterOptions"
        v-bind="$attrs"
        :options="filteredOptions"
        :bottom-slots="!!errorMsg"
        :error="!!errorMsg"
        :error-message="errorMsg"
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
    </q-select>
</template>

<script lang="ts">
export default {
    inheritAttrs: false
}
</script>
<script setup lang="ts">
import { defineProps } from 'vue/dist/vue'
import { QSelectOption, QSelectProps } from 'quasar'
import useBasicSelectFilter from 'src/composables/select/useBasicSelectFilter'

interface Props extends QSelectProps {
    options: QSelectOption[]
    errorMsg?: string
}

const props = defineProps<Props>()
const {
    handleFilterOptions,
    filteredOptions,
} = useBasicSelectFilter(props.options)

</script>

<style scoped>

</style>
