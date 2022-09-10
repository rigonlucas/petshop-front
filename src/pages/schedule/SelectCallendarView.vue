<template>
    <q-btn
        :label="ViewsName[props.currentView]"
        icon="expand_more"
    >
        <q-menu fit>
            <q-list style="min-width: 100px">
                <q-item
                    @click="changeView('listDay')"
                    clickable
                    v-close-popup
                >
                    <q-item-section>
                        <div>
                            <q-icon name="calendar_view_day"/> {{ ViewsName.listDay }}
                        </div>
                    </q-item-section>
                </q-item>
                <q-item
                    @click="changeView('listWeek')"
                    clickable
                    v-close-popup
                >
                    <q-item-section>
                        <div>
                            <q-icon name="calendar_view_week"/> {{ ViewsName.listWeek }}
                        </div>
                    </q-item-section>
                </q-item>
                <q-item
                    @click="changeView('listMonth')"
                    clickable
                    v-close-popup
                >
                    <q-item-section>
                        <div>
                            <q-icon name="calendar_view_week"/> {{ ViewsName.listMonth }}
                        </div>
                    </q-item-section>
                </q-item>

                <q-separator />

                <q-item
                    @click="changeView('timeGridDay')"
                    clickable
                    v-close-popup
                >
                    <q-item-section>
                        <div>
                            <q-icon name="calendar_view_day"/> {{ ViewsName.timeGridDay }}
                        </div>
                    </q-item-section>
                </q-item>
                <q-item
                    @click="changeView('timeGridWeek')"
                    clickable
                    v-close-popup
                >
                    <q-item-section>
                        <div>
                            <q-icon name="calendar_view_week"/> {{ ViewsName.timeGridWeek }}
                        </div>
                    </q-item-section>
                </q-item>
                <q-item
                    @click="changeView('dayGridMonth')"
                    clickable
                    v-close-popup
                >
                    <q-item-section>
                        <div>
                            <q-icon name="calendar_view_month"/> {{ ViewsName.dayGridMonth }}
                        </div>
                    </q-item-section>
                </q-item>
            </q-list>
        </q-menu>
    </q-btn>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps } from 'vue'

enum ViewsName {
    listDay = 'Dia (Lista)',
    listWeek = 'Semana (Lista)',
    listMonth = 'Mês (Lista)',
    timeGridDay = 'Dia (Grid)',
    timeGridWeek = 'Semana (Grid)',
    dayGridMonth = 'Mês (Grid)',
}
const props = defineProps({
    currentView: {
        type: String,
        default: 'Visualização',
    }
})

interface Emits {
    (event: 'change-view', value: string): void
}
const emit = defineEmits<Emits>()

function changeView(viewName: string) {
    emit('change-view', viewName)
}
</script>

<style scoped>

</style>
