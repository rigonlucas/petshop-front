<template>
    <q-card class="my-card" flat bordered>
        <q-img
            height="140px"
            src="https://cdn.quasar.dev/img/parallax1.jpg"
        />

        <q-card-section>
            <div class="text-overline text-orange-9">Usuário</div>
            <div class="text-h5 q-mt-sm q-mb-xs text-center">{{ props.name }}</div>
            <div class="text-center">{{ props.email }}</div>
        </q-card-section>

        <q-card-actions>

            <q-space />

            <q-btn
                v-if="!props.deleted_at"
                :disable="authUserId === props.id"
                flat
                color="red"
                label="Inativar"
            />
            <q-btn
                v-else
                flat
                color="green"
                label="Ativar"
            />
        </q-card-actions>
    </q-card>
</template>

<script lang="ts" setup>
import { ref, defineProps, computed } from 'vue'
import { useAuthStore } from 'stores/auth-store'

const props = defineProps({
    id: {
        type: Number
    },
    name: {
        type: String
    },
    email: {
        type: String
    },
    deleted_at: {
        type: String
    }
})

const authStore = useAuthStore()
const authUserId = ref(authStore.getUser?.id)
</script>

<style scoped>

</style>
