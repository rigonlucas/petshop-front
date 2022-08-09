<template>
    <div class="row q-col-gutter-sm">
        <div class="q-pt-sm col-12 col-md-8">
            <base-select
                :model-value="props.type"
                @update:model-value="(e) => emit('update:type', e)"
                label="Tipo do serviço"
                :options="typesOptions"
            />
        </div>
        <div class="q-pt-sm col-12 col-md-4">
            <base-select
                :model-value="props.duration"
                @input-value="handleInput"
                label="Duração"
                :options="primitivesToQSelectOptions([15, 30, 45, 60])"
                :stack-label="!!props.duration"
                hide-selected
                fill-input
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
            <base-async-select
                :model-value="props.user"
                @update:model-value="handleSelectUser"
                label="Profissional"
                :fetch-callback="fetchUsersCallback"
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

const { primitivesToQSelectOptions } = useHelpers<number>()
const typesOptions = useLabelToOptions(ScheduleTypesLabels)
function handleInput(value: string) {
    const valueAsNumber = Number(value)
    if (isNaN(valueAsNumber)) {
        return
    }

    emit('update:duration', valueAsNumber)
}

const fetchUsersCallback = async (input: string, page: number) => {
    if (!props.datetime || !props.duration) {
        return
    }
    const parsedDate = parse(props.datetime, 'dd/MM/yyyy HH:mm', new Date())
    console.log(parsedDate)
    return await ScheduleService.listAvailableProfessionals({ date_time: format(parsedDate, 'yyyy-MM-dd HH:mm'), duration: props.duration }, page)
}

function handleSelectUser(user: UserModel) {
    emit('update:user', user)
}
</script>

<style scoped>
:deep(.q-table tbody) {
    transition: all 2s ease;
}
</style>
