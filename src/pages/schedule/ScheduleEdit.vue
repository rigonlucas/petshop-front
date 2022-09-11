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
                            :initial-form-data="formInitialData"
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
import ScheduleForm from 'src/features/schedule/components/ScheduleForm.vue'
import { defineProps } from 'vue'
import ScheduleService from 'src/features/schedule/services/ScheduleService'
import { toDetailedSelectOption } from 'src/utils/ModelToSelectOption'
import { ClientModel } from 'src/features/client/models/ClientModel'
import { PetModel } from 'src/features/pet/models/PetModel'
import UserModel from 'src/features/user/models/UserModel'
import { ScheduleFormData, ScheduleTypesLabels } from 'src/features/schedule/models/ScheduleForm'
import { format, parseISO } from 'date-fns'
const props = defineProps({
    id: {
        type: [Number, String],
        required: true,
    }
})

const schedule = await ScheduleService.get(Number(props.id), { include: 'user,pet,client,products.product' })

const formInitialData: ScheduleFormData = {
    client: toDetailedSelectOption<ClientModel>({ model: schedule.client }),
    pet: toDetailedSelectOption<PetModel>({ model: schedule.pet }),
    user: toDetailedSelectOption<UserModel>({ model: schedule.user }),
    duration: schedule.duration,
    start_at: format(parseISO(schedule.start_at), 'dd/MM/yyyy HH:mm'),
    description: schedule.description,
    type: {
        label: ScheduleTypesLabels[schedule.type],
        value: schedule.type,
        details: schedule.type
    },
    products: schedule.products
}
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
