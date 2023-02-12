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
                    <div class="col">
                        <schedule-form
                            class="q-py-none"
                            @submiting="isSubmiting = true"
                            @success="handleSuccess"
                            @error="isSubmiting = false"
                        />
                    </div>
                </div>
            </q-card-section>

            <q-card-actions class="bg-white text-teal" align="right">
                <q-btn v-close-popup>Fechar</q-btn>
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import ScheduleForm from 'src/modules/schedule/components/ScheduleForm.vue'
import { ref } from 'vue'

const router = useRouter()

function handleHide() {
    router.push({ name: 'schedule.index' })
}

const isSubmiting = ref(false)
function handleSuccess() {
    handleHide()
    isSubmiting.value = false
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
