<template>
    <q-dialog
        :model-value="true"
        @hide="handleHide"
    >
        <q-card style="width: 700px; max-width: 80vw;">
            <q-card-section>
                <div class="text-h6">Novo agendamento</div>
                <q-separator/>

                <div class="row" style="padding-top: 10px">
                    <schedule-form
                        v-model:client="formData.client"
                    />
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
import { FormData } from 'src/features/schedule/models/ScheduleForm'
import { reactive } from 'vue'

const router = useRouter()
function handleHide() {
    router.push({ name: 'schedule.index' })
}

const formData: FormData = reactive({
    client: null
})

</script>
