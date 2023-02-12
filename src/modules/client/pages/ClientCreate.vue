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
        <p class="text-h5">Novo produto</p>
        <div class="row">
            <div class="col col-lg-8">
                <client-form @success="handleSuccess" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

import ClientForm from 'src/modules/client/components/ClientForm.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function handleSuccess() {
    router.push({ name: 'client.index' })
}
</script>
