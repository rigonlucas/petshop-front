<template>
    <q-stepper
        v-model="step"
        vertical
        animated
        flat
        header-nav
    >
        <q-step title="Selecione o cliente" :name="STEPS.STEP_CLIENT_SELECT">
            <q-input
                :model-value="props.name"
                @change="emit('update:name', $event)"
                label="Nome"
                outlined
            />
        </q-step>
        <q-step title="Selecione o serviço" :name="STEPS.STEP_SERVICE_SELECT">
            <q-input
                :model-value="props.name"
                @change="emit('update:name', $event)"
                label="Nome"
                outlined
            />
        </q-step>
        <q-step title="Informações complementares" :name="STEPS.STEP_OTHER_INFOS">
            <q-input
                :model-value="props.name"
                @change="emit('update:name', $event)"
                label="Nome"
                outlined
            />
        </q-step>
        <q-step title="Produtos/Serviços" :name="STEPS.STEP_PRODUCTS">
            <q-input
                :model-value="props.name"
                @change="emit('update:name', $event)"
                label="Nome"
                outlined
            />
        </q-step>

    </q-stepper>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue'

enum STEPS {
    STEP_CLIENT_SELECT = 1,
    STEP_SERVICE_SELECT = 2,
    STEP_OTHER_INFOS = 3,
    STEP_PRODUCTS = 4,
}

interface Props {
    name: string
}
const props = defineProps<Props>()
export interface Emits {
    (event: 'update:name', value: string): void
}
const emit = defineEmits<Emits>()

const step = ref<STEPS>(STEPS.STEP_CLIENT_SELECT)

</script>

<style scoped>

</style>
