<template>
    <q-dialog
        :model-value="true"
        @hide="handleHide"
        full-height
    >
        <q-card class="dialog-card">
            <q-card-section>
                <div class="text-h6">Novo agendamento</div>
                <q-separator/>

                <div class="row">
                    <schedule-form class="q-py-none"/>
                </div>
            </q-card-section>

            <q-card-actions class="bg-white text-teal" align="right">
                <q-btn color="primary">Salvar</q-btn>
                <q-btn v-close-popup>Cancelar</q-btn>
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import ScheduleForm from 'src/features/schedule/components/ScheduleForm.vue'

const router = useRouter()

function handleHide() {
    router.push({ name: 'schedule.index' })
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
