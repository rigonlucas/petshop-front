<template>
    <div class="text-h6 flex" style="align-items: center;">
        <q-icon :name="icon"/>
        <transition enter-active-class="animated fadeIn">
            <q-skeleton
                v-if="!value"
                type="text"
                animation="none"
                style="flex-grow: 1;"
            />
            <span v-else>{{ value }}</span>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

interface Props {
    icon: string
    value?: string
}

defineProps<Props>()
</script>

<style scoped lang="scss">

</style>
