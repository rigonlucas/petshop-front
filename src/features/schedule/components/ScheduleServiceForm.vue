<template>
    <div class="row q-col-gutter-sm">
        <div class="q-pt-sm col-12 col-md-8">
            <q-select
                :model-value="props.type"
                @update:model-value="(e) => emit('update:type', e)"
                @filter="onFilterTypes"
                label="Tipo do serviço"
                :options="filteredTypeOptions"
                outlined
                use-input
                input-debounce="0"
            />
        </div>
        <div class="q-pt-sm col-12 col-md-4">
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
            >
                <template #option="scope">
                    <q-item v-bind="scope.itemProps" style="align-items: center; justify-content: space-between; gap: 10px;">
                        <q-item-label>{{ scope.opt }} minutos</q-item-label>
                    </q-item>
                </template>
            </q-select>
        </div>
    </div>
    <div class="row q-col-gutter-sm q-pt-sm">
        <div class="col-12 col-md-4">
            <q-input
                :model-value="datetime"
                @update:model-value="emit('update:datetime', $event)"
                outlined
            >
                <template #prepend>
                    <q-btn
                        icon="event"
                        round
                        color="primary"
                    >
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-date
                                :model-value="datetime"
                                @update:model-value="emit('update:datetime', $event)"
                                mask="DD/MM/YYYY HH:mm"
                            >
                                <div class="row items-center justify-end">
                                    <q-btn v-close-popup label="Confirmar" color="primary" flat />
                                </div>
                            </q-date>
                        </q-popup-proxy>
                    </q-btn>
                </template>
                <template #append>
                    <q-btn
                        icon="access_time"
                        round
                        color="primary"
                    >
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-time
                                :model-value="datetime"
                                @update:model-value="emit('update:datetime', $event)"
                                mask="DD/MM/YYYY HH:mm"
                            >
                                <div class="row items-center justify-end">
                                    <q-btn v-close-popup label="Confirmar" color="primary" flat />
                                </div>
                            </q-time>
                        </q-popup-proxy>
                    </q-btn>
                </template>
            </q-input>
        </div>
        <div class="col-12 col-md-8">
            <q-select
                :model-value="props.user"
                @update:model-value="handleSelectUser"
                label="Profissional"
                :options="usersOptions"
                outlined
                use-input
                input-debounce="200"
                @filter="handleUsersFilter"
                @virtual-scroll="handleUsersOnScroll"
                :loading="isLoadingUsers"
            >
                <template #no-option>
                    <q-item style="align-items: center;">
                        Nenhum usuário encontrado
                    </q-item>
                </template>
            </q-select>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import useSelectAjaxOptions, { DetailedSelectOption } from 'src/composables/select/useSelectAjaxOptions'
import useLabelToOptions from 'src/composables/select/useLabelToOptions'
import { ScheduleTypesLabels } from 'src/features/schedule/models/ScheduleForm'
import useBasicSelectFilter from 'src/composables/select/useBasicSelectFilter'
import UserModel from 'src/features/user/models/UserModel'
import UserService from 'src/features/user/services/UserService'

interface Props {
    type?: DetailedSelectOption<null>
    duration?: number
    datetime?: string
    user?: UserModel
}

const props = defineProps<Props>()

interface Emits {
    (event: 'update:type', value: DetailedSelectOption<null> | null): void
    (event: 'update:duration', value: number | null): void
    (event: 'update:datetime', value: string | null): void
    (event: 'update:user', value: UserModel | null): void
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

const {
    options: usersOptions,
    handleFilter: handleUsersFilter,
    handleOnScroll: handleUsersOnScroll,
    isLoading: isLoadingUsers,
} = useSelectAjaxOptions<UserModel>(async (input, page) => {
    return await UserService.list({ name: input, page })
})
function handleSelectUser(user: UserModel) {
    emit('update:user', user)
}
</script>

<style scoped>
:deep(.q-table tbody) {
    transition: all 2s ease;
}
</style>
