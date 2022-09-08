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
                <product-form :id="props.id" :initial-form-data="product" @success="handleSuccess" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

import ProductForm from 'src/features/products/components/ProductForm.vue'
import { useRouter } from 'vue-router'
import ProductService from 'src/features/products/services/ProductService'
import { defineProps } from 'vue'

const props = defineProps({
    id: {
        type: Number,
        required: true,
    }
})

const router = useRouter()

function handleSuccess() {
    router.push({ name: 'product.index' })
}

const product = await ProductService.get(props.id)

</script>
