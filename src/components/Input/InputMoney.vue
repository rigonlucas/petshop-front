<template>
    <q-input
        outlined
        hide-bottom-space
        :error="!!errorMsg"
        :error-message="errorMsg"
        v-bind="$attrs"
        :model-value="formattedValue"
        ref="inputRef"
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
import { defineEmits, watch } from 'vue'
import { CurrencyDisplay, useCurrencyInput } from 'vue-currency-input'

interface Props extends QInputProps {
    errorMsg?: string
    modelValue: number|null
}
const props = defineProps<Props>()
defineEmits(['update:modelValue'])

const { inputRef, formattedValue, setValue } = useCurrencyInput({
    currency: 'BRL',
    currencyDisplay: CurrencyDisplay.hidden,
    precision: 2,
    hideCurrencySymbolOnFocus: true,
    hideGroupingSeparatorOnFocus: false,
    hideNegligibleDecimalDigitsOnFocus: false,
    autoDecimalDigits: true,
    useGrouping: true,
    accountingSign: false,
})

watch(() => props.modelValue, (value) => {
    setValue(value)
})
</script>

<style scoped>

</style>
