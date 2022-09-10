<template>
    <div>
        <span id="popover-fall-back"/>
        <q-popup-proxy
            :model-value="showPopup"
            :target="menuTarget"
            :anchor="popupPosition.anchor"
            :self="popupPosition.self"
            :cover="popupPosition.cover"
            class="schedule-popover q-pa-sm"
            @before-hide="handleHiddenMenu"
            max-height="800px"
        >
            <div class="bg-white q-pa-sm">
                <schedule-form
                    :initial-form-data="prefilledScheduleData"
                    show-save-button
                    @success="handleCreatedSchedule"
                />
            </div>
        </q-popup-proxy>

        <div class="column">
            <div class="col-2">
                <q-btn
                    type="button"
                    color="primary"
                    icon="add"
                    :to="{ name: 'schedule.create' }"
                >
                    Adicionar
                </q-btn>
            </div>
            <div class="col-10 q-pt-sm" style="height: calc(100vh - 160px)">
                <div class="row q-pb-sm" style="align-items: end;">
                    <div class="col-12 col-sm-4 q-gutter-sm">
                        <q-btn
                            type="button"
                            color="primary"
                            class="q-mr-md"
                            @click="goToday"
                        >
                            Hoje
                        </q-btn>

                        <q-btn
                            type="button"
                            @click="goPrevious"
                        >
                            <q-icon name="chevron_left"/>
                        </q-btn>
                        <q-btn
                            type="button"
                            @click="goNext"
                        >
                            <q-icon name="chevron_right"/>
                        </q-btn>
                    </div>
                    <div class="col-12 col-sm-4 ">
                        <p class="text-h5">{{ currentDateString }}</p>
                    </div>
                    <div class="col-12 flex justify-end col-sm-4">
                        <select-callendar-view
                            :current-view="scheduleStore.selectedView"
                            @change-view="changeView"
                        />
                    </div>
                </div>
                <full-calendar
                    ref="calendar"
                    :options="calendarOptions"
                >
                </full-calendar>
            </div>
        </div>

        <Suspense>
            <router-view/>
            <template #fallback>
                <q-inner-loading showing/>
            </template>
        </Suspense>
    </div>
</template>

<script lang="ts" setup>
import '@fullcalendar/core/vdom'
import FullCalendar, { EventInput } from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { CalendarOptions } from '@fullcalendar/core'
import listPlugin from '@fullcalendar/list'
import localePtBr from '@fullcalendar/core/locales/pt-br'
import ScheduleService from 'src/features/schedule/services/ScheduleService'
import { differenceInMinutes, format, getDay, isPast } from 'date-fns'
import { ScheduleFormData } from 'src/features/schedule/models/ScheduleForm'
import { useRouter } from 'vue-router'
import { reactive, ref } from 'vue'

import ScheduleForm from 'src/features/schedule/components/ScheduleForm.vue'
import { useSchedulePopup } from 'pages/schedule/composables/useSchedulePopup'
import SelectCallendarView from 'pages/schedule/SelectCallendarView.vue'
import { useScheduleStore } from 'stores/schedule'
import { useCalendar } from 'pages/schedule/composables/UseCalendar'

const router = useRouter()
const scheduleStore = useScheduleStore()
const calendar = ref<InstanceType<typeof FullCalendar>>()

const prefilledScheduleData = reactive<ScheduleFormData>({
    start_at: format(new Date(), 'dd/MM/yyyy HH:mm'),
    duration: 30,
})

function handleCreatedSchedule() {
    showPopup.value = false
    if (!calendar.value) {
        return
    }
    calendar.value?.getApi().refetchEvents()
}

async function fetchSchedules({ start, end }: { start: Date, end: Date }): Promise<EventInput[]> {
    const response = await ScheduleService.list({
        start_at_start: format(start, 'yyyy-MM-dd'),
        start_at_end: format(end, 'yyyy-MM-dd'),
        include: 'user,pet,client',
    })

    return response.data.map(schedule => (
        {
            title: `${schedule.pet.name} - ${schedule.client.name}`,
            date: schedule.start_at,
            end: schedule.finish_at,
            className: 'cursor-pointer',
            extendedProps: schedule,
        }
    ))
}

const {
    handleHiddenMenu,
    handleSelect,
    menuTarget,
    showPopup,
    popupPosition,
} = useSchedulePopup(calendar)

const {
    goPrevious,
    goNext,
    goToday,
    changeView,
    currentDateString
} = useCalendar(calendar)

const calendarOptions: CalendarOptions = {
    locale: localePtBr,
    initialView: scheduleStore.selectedView,
    height: '100%',
    headerToolbar: false,
    plugins: [
        listPlugin,
        timeGridPlugin,
        dayGridPlugin,
        interactionPlugin,
    ],
    selectable: true,
    selectMirror: true,
    selectAllow: (e) => !isPast(e.start),
    weekends: true,
    firstDay: getDay(new Date()),
    events: fetchSchedules,
    eventClick: (e) => {
        const eventId = e.event.extendedProps.id
        if (!eventId) {
            return
        }
        router.push({ name: 'schedule.edit', params: { id: eventId } })
    },
    select: (e) => {
        if (isPast(e.start)) {
            return
        }

        prefilledScheduleData.start_at = format(e.start, 'dd/MM/yyyy HH:mm')
        prefilledScheduleData.duration = differenceInMinutes(e.end, e.start)
        handleSelect(e)
    },
}
</script>

<style scoped lang="scss">
.schedule-popover {
    height: 100%;
}

:deep(.fc-event:hover) {
    box-shadow: 0 1px 8px rgb(0 0 0 / 20%), 0 3px 4px rgb(0 0 0 / 14%), 0 3px 3px -2px rgb(0 0 0 / 12%) !important;
}
</style>
