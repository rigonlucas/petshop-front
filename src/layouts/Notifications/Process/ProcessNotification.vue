<template>
    <q-menu
        :offset="[ 0, 8 ]"
        anchor="bottom middle"
        max-height="500px"
        max-width="250px"
        persistent
        self="top middle"
        style="min-width: 350px"
    >
        <q-item-label header>
            Central de downloads
        </q-item-label>
        <q-separator/>

        <q-list v-for="(item) in data.data" :key="item._id">
            <div v-if="isLoading" class="text-center q-my-md">
                <q-spinner-dots color="primary" size="40px"/>
            </div>
            <q-item
                v-ripple
                :caption="item.file_type"
                :href=item?.temporary_url?.url
                clickable
                expand-icon-toggle
                expand-separator
                target="_blank"
            >
                <q-item-section avatar>
                    <q-icon
                        :color=resolveIconColor(item.file_type)
                        :name=resolveIcon(item.file_type)
                        size="md"
                    />
                </q-item-section>

                <q-item-section>
                    <q-item-label lines="1">{{ item.name }}</q-item-label>
                    <template v-if="!item?.has_error" >
                        <q-item-label caption>
                            <template
                                v-if= "new Date(parseInt(item?.temporary_url?.expires_at.$date.$numberLong)) > new Date()"
                            >
                                Válido até {{ format(new Date(parseInt(item?.temporary_url?.expires_at.$date.$numberLong)), 'dd/MM/yyyy HH:mm:ss') }}
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
                    <q-icon
                        color="blue"
                        name="download"
                        size="xs"
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
import { reactive, ref } from 'vue'
import axios from 'axios'
import NotificationProcessService from 'src/modules/Notifications/Process/Services/NotificationProcessService'
import { notifyNegative } from 'src/utils/NotifyHelper'
import { PaginatedServerResponse } from 'src/models/ApiModels'
import ProcessModel from 'src/modules/Notifications/Process/models/ProcessModel'
import { format } from 'date-fns'

const isLoading = ref(true)
let data: PaginatedServerResponse<ProcessModel> = reactive([])

async function handleChangeStatus() {
    isLoading.value = true
    try {
        data = await NotificationProcessService.list()
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
