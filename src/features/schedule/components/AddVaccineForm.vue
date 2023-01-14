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
                {{ vaccines }}
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { AddVaccinesFormData } from 'src/features/schedule/models/ScheduleForm'
import { defineEmits, onMounted } from 'vue'
import { ScheduleHasVaccineModel } from 'src/features/schedule/models/ScheduleHasVaccinesModel'
import { useVaccineStore } from 'stores/vaccine'
import { list } from 'src/features/vaccine/services/VaccineService'

const vaccineStore = useVaccineStore()
const vaccines = vaccineStore.getVaccines

onMounted(async() => {
    if (!vaccines) {
        const vaccineslist = await list()
        vaccineStore.setSetVaccines(vaccineslist)
    }
})

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
