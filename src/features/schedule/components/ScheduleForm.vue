<template>
    <q-stepper
        v-model="step"
        vertical
        animated
        flat
        header-nav
        style="width: 100%;"
    >
        <template #message>
            <q-banner
                v-if="formData.client && formData.pet"
                class="bg-primary text-white preview-banner"
            >
                <div class="row">
                    <div class="col-12 col-md-6">
                        <div class="text-h6">
                            <q-icon name="person" />
                            <span>{{ formData.client.details.name }}</span>
                        </div>
                        <div class="text-h6">
                            <q-icon name="call" />
                            <span>{{ formData.client.details.phone }}</span>
                        </div>
                        <div class="text-h6">
                            <q-icon name="pets" />
                            <span>{{ formData.pet.details.name }}</span>
                        </div>
                    </div>
                    <div class="col-12 col-md-6">
                        <div
                            v-if="formData.user"
                            class="text-h6"
                        >
                            <q-icon name="badge" />
                            <span>{{ formData.user.details.name }}</span>
                        </div>
                        <div
                            v-if="formData.type"
                            class="text-h6"
                        >
                            <q-icon name="design_services" />
                            <span>{{ formData.type.label }}</span>
                        </div>
                        <div
                            v-if="formData.datetime"
                            class="text-h6"
                        >
                            <q-icon name="event" />
                            <span>{{ formData.datetime }}</span>
                        </div>
                    </div>
                </div>
            </q-banner>
        </template>
        <q-step
            title="Selecione o cliente"
            :name="STEPS.STEP_CLIENT_SELECT"
            icon="person"
            active-icon="person"
            done-icon="person"
            :done="step > STEPS.STEP_CLIENT_SELECT"
            @focus.capture="step = STEPS.STEP_CLIENT_SELECT"
        >
            <schedule-client-form
                v-model:client="formData.client"
                v-model:pet="formData.pet"
            />
        </q-step>
        <q-step
            title="Selecione o serviço"
            :name="STEPS.STEP_SERVICE_SELECT"
            icon="design_services"
            active-icon="design_services"
            done-icon="design_services"
            :done="step > STEPS.STEP_SERVICE_SELECT"
            @focus.capture="step = STEPS.STEP_SERVICE_SELECT"
        >
            <schedule-service-form
                v-model:type="formData.type"
                v-model:duration="formData.duration"
                v-model:datetime="formData.datetime"
                v-model:user="formData.user"
            />
        </q-step>
        <q-step
            title="Informações complementares"
            :name="STEPS.STEP_OTHER_INFOS"
            @focus.capture="step = STEPS.STEP_OTHER_INFOS"
        >
            <q-input
                filled
                type="textarea"
                placeholder="Observação"
                v-model="formData.observation"
            />
        </q-step>
        <q-step
            title="Produtos/Serviços"
            :name="STEPS.STEP_PRODUCTS"
            @focus.capture="step = STEPS.STEP_PRODUCTS"
        >
<!--            <q-input-->
<!--                :model-value="props.name"-->
<!--                @change="emit('update:name', $event)"-->
<!--                label="Nome"-->
<!--                outlined-->
<!--            />-->
        </q-step>

    </q-stepper>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import ScheduleClientForm from 'src/features/schedule/components/ScheduleClientForm.vue'
import { FormData } from 'src/features/schedule/models/ScheduleForm'
import ScheduleServiceForm from 'src/features/schedule/components/ScheduleServiceForm.vue'
import { format } from 'date-fns'

enum STEPS {
    STEP_CLIENT_SELECT = 1,
    STEP_SERVICE_SELECT = 2,
    STEP_OTHER_INFOS = 3,
    STEP_PRODUCTS = 4,
}

const formData: FormData = reactive({
    client: null,
    pet: null,
    type: null,
    duration: null,
    datetime: format(new Date(), 'dd/MM/yyyy HH:mm'),
    user: null,
    observation: null,
})

const step = ref<STEPS>(STEPS.STEP_CLIENT_SELECT)

</script>

<style scoped lang="scss">
:deep(.preview-banner) {
    i {
        margin-right: 5px;
    }
}
:deep(.q-stepper__tab) {
    padding-left: 5px !important;
}
:deep(.q-stepper__step-inner) {
    padding-left: 30px;
}
</style>
