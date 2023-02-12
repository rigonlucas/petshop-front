<template>
    <q-dialog
        :model-value="true"
        @hide="handleHide"
        full-height
    >
        <q-card class="dialog-card">
            <q-card-section>
                <div class="text-h6">Editar agendamento</div>
                <q-separator/>

                <div class="row">
                    <div class="col">
                        <schedule-form
                            class="q-py-none"
                            :id="schedule.id"
                            :schedule="schedule"
                            @success="handleSuccess"
                        />
                    </div>
                </div>
            </q-card-section>

            <q-card-actions class="bg-white text-teal" align="right">
                <q-btn v-close-popup>Cancelar</q-btn>
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import ScheduleForm from 'src/modules/schedule/components/ScheduleForm.vue'
import { defineProps } from 'vue'
import ScheduleService from 'src/modules/schedule/services/ScheduleService'

const props = defineProps({
    id: {
        type: [Number, String],
        required: true,
    }
})

const schedule = await ScheduleService.get(Number(props.id), { include: 'user,pet,client,hasProducts.product,hasVaccines.vaccine' })
const router = useRouter()

function handleHide() {
    router.push({ name: 'schedule.index' })
}

function handleSuccess() {
    handleHide()
}

</script>

<style scoped>
.dialog-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-width: 50vw;
}
</style>
