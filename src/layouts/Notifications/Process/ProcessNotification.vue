<template>
    <q-menu
        :offset="[ 0, 8 ]"
        anchor="bottom middle"
        max-height="500px"
        max-width="250px"
        self="top middle"
        style="min-width: 350px"
        @before-show="handleChangeStatus"
    >
        <q-item-label header>
            Central de downloads de relatórios
        </q-item-label>
        <q-separator/>
        <div v-if="isLoading" class="text-center q-my-md">
            <q-spinner-dots color="primary" size="40px"/>
        </div>

        <q-list v-for="(item) in data.data" :key="item._id">
            <q-item
                v-ripple
                clickable
                :caption="item.file_type"
                expand-icon-toggle
                expand-separator
                target="_blank"
            >
                <q-item-section>
                    <q-item-label>
                        <q-icon
                            :color=resolveIconColor(item.file_type)
                            :name=resolveIcon(item.file_type)
                            size="sm"
                        />
                        {{ item.name }}
                    </q-item-label>
                    <template v-if="!item?.has_error" >
                        <q-item-label caption class="pt-lg-5">
                            <template
                                v-if= "new Date(parseInt(item?.temporary_url?.expires_at.$date.$numberLong)) > new Date()"
                            >
                                Válido até
                                <strong>
                                    {{
                                        format(
                                            new Date(parseInt(item?.temporary_url?.expires_at.$date.$numberLong)),
                                            'dd/MM/yyyy HH:mm:ss'
                                        )
                                    }}
                                </strong>
                            </template>
                            <template
                                v-else
                            >
                                <q-chip size="sm" square>
                                    <q-avatar color="red" icon="hourglass_bottom" text-color="white" />
                                    Link expirado
                                </q-chip>
                            </template>
                        </q-item-label>
                    </template>
                    <template v-else>
                        <q-item-label caption>
                            <span class="text-weight-bold">Ocorreu um erro</span>
                        </q-item-label>
                    </template>
                </q-item-section>
                <q-item-label v-if="!item.has_error" caption>
                    <q-btn
                        :href=item?.temporary_url?.url
                        flat
                        color="blue"
                        icon="download"
                        size="md"
                    />
                </q-item-label>
            </q-item>
        </q-list>
    </q-menu>
    <Teleport to="#countDownloads">
        <q-badge color="red" floating text-color="white">
            {{ data.data?.length }}
        </q-badge>
    </Teleport>
</template>

<script lang="ts" setup>
import { defineEmits, reactive, ref } from 'vue'
import axios from 'axios'
import NotificationProcessService from 'src/modules/notifications/process/services/NotificationProcessService'
import { notifyNegative } from 'src/utils/NotifyHelper'
import { PaginatedServerResponse } from 'src/models/ApiModels'
import ProcessModel from 'src/modules/notifications/process/models/ProcessModel'
import { addSeconds, format } from 'date-fns'

const isLoading = ref(false)
const lastLoad = ref<Date|null>(null)
interface Emits {
    (event: 'countNotifications', value: number): void
}
const emit = defineEmits<Emits>()

let data: PaginatedServerResponse<ProcessModel> = reactive([])
async function handleChangeStatus() {
    isLoading.value = true
    try {
        if (lastLoad.value == null || new Date() > lastLoad.value) {
            data = await NotificationProcessService.list()
            lastLoad.value = addSeconds(new Date(), 3)
            emit('countNotifications', data.data.length)
        }
    } catch (error: unknown) {
        if (!axios.isAxiosError(error)) {
            throw error
        }
        notifyNegative(error.response && error.response.data.message)
    } finally {
        isLoading.value = false
    }
}

function resolveIcon(icon: string): string {
    if (icon === 'zip') {
        return 'folder_zip'
    }
    if (icon === 'error') {
        return 'error'
    }
    return ''
}

function resolveIconColor(icon: string): string {
    if (icon === 'zip') {
        return 'blue'
    }
    if (icon === 'error') {
        return 'red'
    }
    return ''
}

handleChangeStatus()
</script>

<style scoped>

</style>
