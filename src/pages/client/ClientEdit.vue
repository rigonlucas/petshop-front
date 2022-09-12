<template>
    <div class="q-ma-sm">
        <div class="row">
            <div class="col q-pb-sm">
                <q-btn
                    type="button"
                    color="primary"
                    icon="chevron_left"
                    :to="{ name: 'client.index' }"
                >
                    Voltar
                </q-btn>
            </div>
        </div>
        <p class="text-h5">Editar cliente</p>
        <div class="row">
            <div class="col col-lg-8">
                <client-form :id="props.id" :initial-form-data="client" @success="handleSuccess" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

import ClientForm from 'src/features/client/components/ClientForm.vue'
import { useRouter } from 'vue-router'
import { defineProps } from 'vue'
import ClientService from 'src/features/client/services/ClientService'

const props = defineProps({
    id: {
        type: Number,
        required: true,
    }
})

const router = useRouter()

function handleSuccess() {
    router.push({ name: 'client.index' })
}

const client = await ClientService.get(props.id)

</script>
