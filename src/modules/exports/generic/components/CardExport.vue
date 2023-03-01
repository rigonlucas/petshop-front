<template>
    <q-card class="my-card">
        <q-card-section>
            <div class="text-h6">
                <q-icon color="primary" name="folder_zip" size="xl"></q-icon>
                Exportar informações
            </div>
            <div class="text-subtitle3">Download de todos os dados em um arquivo ZIP</div>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
            <q-btn
                :loading="isLoadingExportAll"
                color="primary"
                flat
                icon="download"
                @click="exportAll">
                Download
            </q-btn>
        </q-card-actions>
    </q-card>
</template>

<script lang="ts" setup>

import NotificationProcessService from 'src/modules/notifications/process/services/NotificationProcessService'
import axios from 'axios'
import { notifyNegative, notifyPositive } from 'src/utils/NotifyHelper'
import { ref } from 'vue'

const isLoadingExportAll = ref(false)

async function exportAll () {
    isLoadingExportAll.value = true
    try {
        await NotificationProcessService.exportAll()
        notifyPositive('Exportação em andamento')
    } catch (error: unknown) {
        if (!axios.isAxiosError(error)) {
            throw error
        }
        notifyNegative(error.response && error.response.data.message)
    } finally {
        isLoadingExportAll.value = false
    }
}
</script>
