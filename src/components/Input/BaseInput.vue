<template>
    <q-input
        outlined
        hide-bottom-space
        :error="!!errorMsg"
        :error-message="errorMsg"
        v-bind="$attrs"
    >
        <template #prepend>
            <slot name="prepend" />
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

interface Props extends QInputProps {
    errorMsg?: string
}
defineProps<Props>()
</script>

<style scoped>

</style>
