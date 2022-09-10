<template>
    <q-btn
        color="red"
        size="xs"
        icon="delete"
        @click="confirm = true"
    />
    <q-dialog v-model="confirm" transition-show="scale" transition-hide="scale">
        <q-card>
            <q-card :class="['bg-red-6', 'text-white']">
                <q-card-section>
                    <div class="text-h6">
                        <q-icon name="delete"></q-icon>
                        Excluir <strong>{{ props.name }}</strong>
                    </div>
                </q-card-section>
            </q-card>

            <q-card-actions align="right">
                <q-btn flat label="Não" color="primary" v-close-popup />
                <q-btn
                    flat size="small"
                    label="delete"
                    color="red"
                    @click="handlerDeleteProduct"
                />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, ref } from 'vue'
import { notifyNegative, notifyPositive } from 'src/utils/NotifyHelper'
import axios from 'axios'
import ProductService from 'src/features/products/services/ProductService'

const props = defineProps({
    id: {
        type: Number
    },
    name: {
        type: String
    },
})

interface Emits {
    (event: 'update:products'): void
}
const isLoading = ref(false)
const confirm = ref(false)
const emit = defineEmits<Emits>()
async function handlerDeleteProduct() {
    isLoading.value = true
    try {
        await ProductService.remove(props.id)
        notifyPositive('Produto excluído')
        confirm.value = false
        emit('update:products')
    } catch (error: unknown) {
        if (!axios.isAxiosError(error)) {
            throw error
        }
        notifyNegative(error.response && error.response.data.message)
    } finally {
        isLoading.value = false
    }
}

</script>
