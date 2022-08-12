<template>
    <q-banner
        class="bg-primary text-white preview-banner"
    >
        <div class="row">
            <div class="col-12 col-md-6">
                <info-banner-item
                    icon="person"
                    :value="formData.client?.details.name"
                />
                <info-banner-item
                    icon="phone"
                    :value="formData.client?.details.phone"
                />
                <info-banner-item
                    icon="pets"
                    :value="formData.pet?.details.name"
                />
            </div>
            <div class="col-12 col-md-6">
                <info-banner-item
                    icon="badge"
                    :value="formData.user?.details.name"
                />
                <info-banner-item
                    icon="design_services"
                    :value="formData.type?.label"
                />
                <info-banner-item
                    icon="event"
                    :value="formData.start_at"
                />
            </div>
        </div>
    </q-banner>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { FormData } from 'src/features/schedule/models/ScheduleForm'
import InfoBannerItem from 'src/features/schedule/components/InfoBannerItem.vue'

interface Props {
    formData: FormData
}

defineProps<Props>()
</script>

<style scoped lang="scss">
:deep(.preview-banner) {
    i {
        margin-right: 5px;
    }
}
</style>
