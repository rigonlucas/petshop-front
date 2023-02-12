<template>
    <div>
        <div class="row">
            <div class="col">
                <q-btn
                    class="q-ma-sm"
                    color="primary"
                    @click="goBack"
                >
                    <q-icon
                        name="arrow_back"
                    />
                    Voltar
                </q-btn>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <q-table
                    grid
                    title="Vacinas"
                    :rows="rows"
                    :columns="columns"
                    row-key="name"
                    hide-header
                    :hide-pagination="true"
                >
                    <template v-slot:item="props">
                        <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
                            <q-card>
                                <q-card-section class="text-center">
                                    <strong>{{ props.row.name }}</strong>
                                </q-card-section>
                                <q-separator />
                                <q-card-section class="flex flex-center">
                                    <div>{{ props.row.applied ? 'Aplicada' : 'Pendente' }}</div>
                                </q-card-section>
                            </q-card>
                        </div>
                    </template>
                </q-table>
                {{ props.vaccines }}
                <hr>
                {{ vaccineslist }}
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { AddVaccinesFormData } from 'src/modules/schedule/models/ScheduleForm'
import { defineEmits } from 'vue'
import { ScheduleHasVaccineModel } from 'src/modules/schedule/models/ScheduleHasVaccinesModel'
import { list } from 'src/modules/vaccine/services/VaccineService'

const vaccineslist = await list()

interface Props {
    scheduleId?: number
    vaccines: ScheduleHasVaccineModel[]
}
const props = defineProps<Props>()

interface Emits {
    (event: 'go-back'): void
    (event: 'update:vaccines', value: AddVaccinesFormData[]): void
}
const emit = defineEmits<Emits>()
const rows = props.vaccines.map((item) => {
    return {
        id: item.id,
        applied: item.applied,
        vaccine_id: item.vaccine?.id,
        name: item.vaccine?.name
    }
})
const columns = [
    { name: 'name', label: 'Nome', field: 'name' },
    { name: 'type', label: 'Animal', field: 'type' }
]

function goBack() {
    emit('go-back')
}
</script>

<style scoped>

</style>
