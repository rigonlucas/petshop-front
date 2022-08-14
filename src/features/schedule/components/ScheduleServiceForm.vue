<template>
    <div class="row q-col-gutter-sm">
        <div class="q-pt-sm col-12 col-md-8">
            <base-select
                :model-value="props.type"
                @update:model-value="handleTypeSelect"
                label="Tipo do serviço"
                :options="typesOptions"
                :error-msg="typeErrors[0]?.$message || ''"
            />
        </div>
        <div class="q-pt-sm col-12 col-md-4">
            <base-select
                :model-value="props.duration"
                @input-value="handleDurationInput"
                label="Duração"
                :options="primitivesToQSelectOptions([15, 30, 45, 60])"
                :stack-label="!!props.duration"
                hide-selected
                fill-input
                :error-msg="durationErrors[0]?.$message || ''"
            >
                <template #option="scope">
                    <q-item v-bind="scope.itemProps" style="align-items: center;">
                        <q-item-label>{{ scope.opt.label }} minutos</q-item-label>
                    </q-item>
                </template>
            </base-select>
        </div>
    </div>
    <div class="row q-col-gutter-sm q-pt-sm">
        <div class="col-12 col-md-4">
            <base-input
                :model-value="start_at"
                @update:model-value="emit('update:start_at', $event)"
                :error-msg="start_atErrors[0]?.$message || ''"
                mask="##/##/#### ##:##"
            >
                <template #prepend>
                    <q-btn
                        icon="event"
                        round
                        color="primary"
                    >
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-date
                                :model-value="start_at"
                                @update:model-value="emit('update:start_at', $event)"
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
                                :model-value="start_at"
                                @update:model-value="emit('update:start_at', $event)"
                                mask="DD/MM/YYYY HH:mm"
                            >
                                <div class="row items-center justify-end">
                                    <q-btn v-close-popup label="Confirmar" color="primary" flat />
                                </div>
                            </q-time>
                        </q-popup-proxy>
                    </q-btn>
                </template>
            </base-input>
        </div>
        <div class="col-12 col-md-8">
            <base-async-select
                :model-value="props.user"
                @update:model-value="handleSelectUser"
                label="Profissional"
                :fetch-callback="fetchUsersCallback"
                :error-msg="userErrors[0]?.$message || ''"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { DetailedSelectOption } from 'src/composables/select/useSelectAjaxOptions'
import useLabelToOptions from 'src/composables/select/useLabelToOptions'
import { ScheduleTypesLabels } from 'src/features/schedule/models/ScheduleForm'
import UserModel from 'src/features/user/models/UserModel'
import BaseSelect from 'components/Select/BaseSelect.vue'
import useHelpers from 'src/composables/select/useHelpers'
import BaseAsyncSelect from 'components/Select/BaseAsyncSelect.vue'
import ScheduleService from 'src/features/schedule/services/ScheduleService'
import { format, parse } from 'date-fns'
import { QSelectOption } from 'quasar'
import { ErrorObject } from '@vuelidate/core'
import BaseInput from 'components/Input/BaseInput.vue'

interface Props {
    type?: DetailedSelectOption<number>
    duration?: number
    start_at?: string
    user?: UserModel
    typeErrors?: ErrorObject[]
    durationErrors?: ErrorObject[]
    start_atErrors?: ErrorObject[]
    userErrors?: ErrorObject[]
}
const props = defineProps<Props>()

interface Emits {
    (event: 'update:type', value: DetailedSelectOption<number> | null): void
    (event: 'update:duration', value: number | null): void
    (event: 'update:start_at', value: string | null): void
    (event: 'update:user', value: UserModel | null): void
}
const emit = defineEmits<Emits>()

const { primitivesToQSelectOptions } = useHelpers<number>()
const typesOptions = useLabelToOptions(ScheduleTypesLabels)
function handleDurationInput(value: string) {
    const valueAsNumber = Number(value)
    if (isNaN(valueAsNumber) || value === '' || value === null) {
        return
    }

    emit('update:duration', valueAsNumber)
}

const fetchUsersCallback = async (input: string, page: number) => {
    if (!props.start_at || !props.duration) {
        return
    }
    const parsedDate = parse(props.start_at, 'dd/MM/yyyy HH:mm', new Date())
    return await ScheduleService.listAvailableProfessionals({ date_time: format(parsedDate, 'yyyy-MM-dd HH:mm'), duration: props.duration }, page)
}

function handleSelectUser(user: UserModel) {
    emit('update:user', user)
}

function handleTypeSelect(selectOption: QSelectOption<number>) {
    selectOption.value = Number(selectOption.value)
    emit('update:type', selectOption)
}
</script>

<style scoped>
:deep(.q-table tbody) {
    transition: all 2s ease;
}
</style>
