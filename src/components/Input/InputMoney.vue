<template>
    <q-input
        outlined
        hide-bottom-space
        :error="!!errorMsg"
        :error-message="errorMsg"
        v-bind="$attrs"
        mask="##,##"
        :model-value="modelValue"
        @update:model-value="handleInput"
    >
        <template #prepend>
            <slot name="prepend">
                <span>R$</span>
            </slot>
        </template>
        <template #append>
            <slot name="append" />
        </template>
    </q-input>
</template>

<script lang="ts">
export default {
    inheritAttrs: false
}
</script>
<script setup lang="ts">
import { defineProps } from 'vue/dist/vue'
import { QInputProps } from 'quasar'
import { defineEmits } from 'vue'

interface Props extends QInputProps {
    errorMsg?: string
    modelValue: number|null
}
defineProps<Props>()
const emit = defineEmits(['update:modelValue'])

function handleInput(value: string) {
    const valueAsFloat = parseFloat(value.replace(',', '.').replace('R$ ', ''))
    if (isNaN(valueAsFloat)) {
        return emit('update:modelValue', null)
    }
    emit('update:modelValue', valueAsFloat)
}
</script>

<style scoped>

</style>
