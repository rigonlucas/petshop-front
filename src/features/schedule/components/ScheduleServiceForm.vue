<template>
    <div class="flex" style="gap: 10px;">
        <q-select
            :model-value="props.type"
            @update:model-value="(e) => emit('update:type', e)"
            @filter="onFilterTypes"
            label="Tipo do serviço"
            :options="filteredTypeOptions"
            outlined
            use-input
            input-debounce="0"
            style="flex-grow: 2"
        />

        <q-select
            :model-value="props.duration"
            @input-value="handleInput"
            label="Duração"
            :options="[15, 30, 45, 60]"
            hide-selected
            :stack-label="!!props.duration"
            outlined
            use-input
            fill-input
            input-debounce="0"
            style="flex-grow: 0"
        >
            <template #option="scope">
                <q-item v-bind="scope.itemProps" style="align-items: center; justify-content: space-between; gap: 10px;">
                    <q-item-label>{{ scope.opt }} minutos</q-item-label>
                </q-item>
            </template>
        </q-select>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { DetailedSelectOption } from 'src/composables/select/useSelectAjaxOptions'
import useLabelToOptions from 'src/composables/select/useLabelToOptions'
import { ScheduleTypesLabels } from 'src/features/schedule/models/ScheduleForm'
import useBasicSelectFilter from 'src/composables/select/useBasicSelectFilter'

interface Props {
    type?: DetailedSelectOption<null>
    duration?: number
}

const props = defineProps<Props>()

interface Emits {
    (event: 'update:type', value: DetailedSelectOption<null> | null): void
    (event: 'update:duration', value: number | null): void
}

const emit = defineEmits<Emits>()

const typesOptions = useLabelToOptions(ScheduleTypesLabels)
const {
    onFilter: onFilterTypes,
    filteredOptions: filteredTypeOptions,
} = useBasicSelectFilter(typesOptions)

function handleInput(value: number) {
    if (isNaN(value)) {
        return
    }
    emit('update:duration', value)
}
</script>
