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
                <product-form />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

import ProductForm from 'src/features/products/components/ProductForm.vue'
</script>
