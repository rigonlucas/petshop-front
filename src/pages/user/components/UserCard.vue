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
                @click="confirm = true"
            />
            <q-btn
                v-else
                flat
                color="green"
                label="Ativar"
                @click="confirm = true"
            />
        </q-card-actions>
    </q-card>

    <q-dialog v-model="confirm" persistent>
        <q-card>
            <q-card-section class="row items-center">
                <q-avatar :icon="iconStatusUser()" :color="colorStatusUser()" text-color="white" />
                <span class="q-ml-sm">
                    {{ messageStatusUser() }} <strong>{{ props.name }}</strong>?
                </span>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn flat label="Não" color="primary" v-close-popup />
                <q-btn flat size="small" :label="labelStatusUser()" :color="colorStatusUser()" @click="handleChangeStatus"/>
            </q-card-actions>
        </q-card>
    </q-dialog>

</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits } from 'vue'
import { useAuthStore } from 'stores/auth-store'
import { notifyNegative, notifyPositive } from 'src/utils/NotifyHelper'
import axios from 'axios'
import UserService from 'src/features/user/services/UserService'

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
const confirm = ref(false)
const isLoading = ref(false)
interface Emits {
    (event: 'update:user'): void
}

const emit = defineEmits<Emits>()

const messageStatusUser = () => {
    if (props.deleted_at) {
        return 'Ativar a conta de'
    }
    return 'Inativar a conta de'
}

const iconStatusUser = () => {
    if (props.deleted_at) {
        return 'restore'
    }
    return 'remove_circle'
}

const colorStatusUser = () => {
    if (props.deleted_at) {
        return 'green'
    }
    return 'red'
}

const labelStatusUser = () => {
    if (props.deleted_at) {
        return 'Ativar'
    }
    return 'Inativar'
}

async function handleChangeStatus() {
    isLoading.value = true
    try {
        await UserService.changeStatus(props.id)
        notifyPositive('Usuário inativo')
        confirm.value = false
        emit('update:user')
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

<style scoped>

</style>
