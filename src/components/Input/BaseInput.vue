<template>
    <q-input
        outlined
        v-bind="$attrs"
        autocomplete="on"
    />
</template>

<script lang="ts">
export default {
    inheritAttrs: false
}
</script>
<script setup lang="ts">
import { defineProps } from 'vue/dist/vue'
import { QInputProps, QSelectOption, QSelectProps } from 'quasar'
import useBasicSelectFilter from 'src/composables/select/useBasicSelectFilter'

/* eslint-disable */
interface Props extends QInputProps {
}
defineProps<Props>()
</script>

<style scoped>

</style>
