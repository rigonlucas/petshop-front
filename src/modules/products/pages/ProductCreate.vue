<template>
    <div class="q-ma-sm">
        <div class="row">
            <div class="col q-pb-sm">
                <q-btn
                    type="button"
                    color="primary"
                    icon="chevron_left"
                    :to="{ name: 'product.index' }"
                >
                    Voltar
                </q-btn>
            </div>
        </div>
        <p class="text-h5">Novo produto</p>
        <div class="row">
            <div class="col col-lg-8">
                <product-form @success="handleSuccess" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

import ProductForm from 'src/modules/products/components/ProductForm.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function handleSuccess() {
    router.push({ name: 'product.index' })
}
</script>
