<template>
    <q-card class="my-card" flat bordered>
        <q-card-section>
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

    <q-dialog v-model="confirm" transition-show="scale" transition-hide="scale">
        <q-card>
            <q-card :class="['bg-'+colorStatusUser()+'-6', 'text-white']">
                <q-card-section>
                    <div class="text-h6">
                        <q-icon :name="iconStatusUser()"></q-icon>
                        {{ labelDialog() }}
                    </div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <span class="q-ml-sm">
                        <strong>{{ props.name }}</strong>
                    </span>
                </q-card-section>
            </q-card>
            <q-card-section v-if="!props.deleted_at">
                Ao inativar a conta, a ativação da mesma só poderá ser realizada em 30 dias
            </q-card-section>
            <q-card-section v-else>
                Para ativar a conta, é necessário aguardar 30 dias após a desativação.
                <div class="d-block text-center" v-if="diffInDays >= 0">
                    <h6>{{ daysToActiveUser() }}</h6>
                </div>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn flat label="Não" color="primary" v-close-popup />
                <q-btn
                    flat size="small"
                    :label="labelStatusUser()"
                    :color="colorStatusUser()"
                    :disable="props.deleted_at !== null && diffInDays > 0"
                    @click="handleChangeStatus"
                />
            </q-card-actions>
        </q-card>
    </q-dialog>

</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits } from 'vue'
import { useAuthStore } from 'src/modules/auth'
import { notifyNegative, notifyPositive } from 'src/utils/NotifyHelper'
import axios from 'axios'
import UserService from 'src/modules/user/services/UserService'
import { addDays, differenceInDays } from 'date-fns'

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
const diffInDays = ref(null)
    interface Emits {
    (event: 'update:user'): void
}

const emit = defineEmits<Emits>()

const labelDialog = () => {
    if (props.deleted_at) {
        return 'Ativar'
    }
    return 'Inativar'
}

const daysToActiveUser = () => {
    diffInDays.value = differenceInDays(addDays(new Date(props.deleted_at), 30), new Date())
    if (diffInDays.value > 0) {
        return `Restam ${diffInDays.value} dias`
    }

    if (diffInDays.value === 0) {
        return `Resta ${diffInDays.value} dia`
    }
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
        notifyPositive('Conta atualizada')
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
