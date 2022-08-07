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
                transition-show="slide-up"
                class="bg-primary text-white"
            >
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
            />
        </q-step>
        <q-step
            title="Informações complementares"
            :name="STEPS.STEP_OTHER_INFOS"
            @focus.capture="step = STEPS.STEP_OTHER_INFOS"
        >
<!--            <q-input-->
<!--                :model-value="props.name"-->
<!--                @change="emit('update:name', $event)"-->
<!--                label="Nome"-->
<!--                outlined-->
<!--            />-->
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
import { defineEmits, ref, reactive, computed } from 'vue'
import ScheduleClientForm from 'src/features/schedule/components/ScheduleClientForm.vue'
import { QSelectOption } from 'quasar'
import { FormData } from 'src/features/schedule/models/ScheduleForm'
import ScheduleServiceForm from 'src/features/schedule/components/ScheduleServiceForm.vue'

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
})

const step = ref<STEPS>(STEPS.STEP_CLIENT_SELECT)

</script>

<style scoped>
:deep(.q-stepper__tab) {
    padding-left: 5px !important;
}
</style>
