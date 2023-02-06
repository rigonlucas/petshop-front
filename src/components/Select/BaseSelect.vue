<template>
    <q-select
        outlined
        use-input
        hide-bottom-space
        input-debounce="0"
        emit-value
        map-options
        @filter="handleFilterOptions"
        @update:model-value="handleInput"
        :model-value="modelValue"
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
import { defineProps, defineEmits } from 'vue'
import { QSelectOption, QSelectProps } from 'quasar'
import useBasicSelectFilter from 'src/composables/select/useBasicSelectFilter'

interface Props extends QSelectProps {
    modelValue: any
    options: QSelectOption[]
    errorMsg?: string
}

const props = defineProps<Props>()

interface Emits {
    (event: 'input', value: string): void
}
const emit = defineEmits<Emits>()

function handleInput(val: string) {
    emit('input', val)
}

const {
    handleFilterOptions,
    filteredOptions,
} = useBasicSelectFilter(props.options)

</script>

<style scoped>

</style>
