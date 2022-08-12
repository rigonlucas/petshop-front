<template>
    <form id="schedule-form" @submit.prevent="handleSubmit">
        <info-banner :form-data="formData" />

        <schedule-client-form
            v-model:client="formData.client"
            v-model:pet="formData.pet"
        />
        <schedule-service-form
            v-model:type="formData.type"
            v-model:duration="formData.duration"
            v-model:start_at="formData.start_at"
            v-model:user="formData.user"
        />
        <div class="row q-py-sm">
            <div class="col">
                <q-input
                    filled
                    type="textarea"
                    placeholder="Observação"
                    v-model="formData.observation"
                />
            </div>
        </div>
    </form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import ScheduleClientForm from 'src/features/schedule/components/ScheduleClientForm.vue'
import { FormData } from 'src/features/schedule/models/ScheduleForm'
import ScheduleServiceForm from 'src/features/schedule/components/ScheduleServiceForm.vue'
import { format } from 'date-fns'
import InfoBanner from 'src/features/schedule/components/InfoBanner.vue'
import ScheduleService from 'src/features/schedule/services/ScheduleService'

interface Emits {
    (event: 'submiting'): void
    (event: 'error'): void
    (event: 'success'): void
}
const emit = defineEmits<Emits>()

const formData: FormData = reactive({
    client: null,
    pet: null,
    type: null,
    duration: null,
    start_at: format(new Date(), 'dd/MM/yyyy HH:mm'),
    user: null,
    observation: null,
})

async function handleSubmit() {
    try {
        emit('submiting')
        const { client, pet, user, type, ...rest } = formData
        console.log(type)
        await ScheduleService.create({
            client_id: client?.value,
            pet_id: pet?.value,
            user_id: user?.value,
            type: type?.value,
            ...rest
        })
        emit('success')
    } catch (error) {
        emit('error')
    }
}

</script>

<style scoped lang="scss">

</style>
