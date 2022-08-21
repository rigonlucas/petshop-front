<template>
    <q-page class="schedule-index">
        <span id="popover-fall-back"/>
        <div class="row">
            <div class="col">
                <q-btn
                    type="button"
                    color="primary"
                    icon="add"
                    :to="{ name: 'schedule.create' }"
                >
                    Adicionar
                </q-btn>
            </div>
        </div>
        <div class="row">
            <div class="col">
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
                <full-calendar
                    ref="calendar"
                    :options="calendarOptions"
                >
                </full-calendar>
            </div>
        </div>
        <router-view/>
    </q-page>
</template>

<script lang="ts" setup>
import '@fullcalendar/core/vdom'
import FullCalendar, { EventInput } from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { CalendarOptions } from '@fullcalendar/core'
import localePtBr from '@fullcalendar/core/locales/pt-br'
import ScheduleService from 'src/features/schedule/services/ScheduleService'
import { differenceInMinutes, format, getDay, isPast } from 'date-fns'
import { FormData } from 'src/features/schedule/models/ScheduleForm'
// import { useRouter } from 'vue-router'
import { reactive, ref } from 'vue'

import ScheduleForm from 'src/features/schedule/components/ScheduleForm.vue'
import { useSchedulePopup } from 'pages/schedule/composables/useSchedulePopup'

// function handleDateClick(e) {
//     console.log({ click: e })
// }
// const router = useRouter()

const prefilledScheduleData = reactive<FormData>({
    start_at: format(new Date(), 'dd/MM/yyyy HH:mm'),
    duration: 30,
})
function handleCreatedSchedule() {
    showPopup.value = false
    if (!calendar.value) {
        return
    }
    calendar.value.getApi().refetchEvents()
}

async function fetchSchedules({ start, end }: { start: Date, end: Date }): Promise<EventInput[]> {
    const response = await ScheduleService.list({
        start_at_start: format(start, 'yyyy-MM-dd'),
        start_at_end: format(end, 'yyyy-MM-dd'),
        include: ['user', 'pet', 'client'],
    })

    return response.data.map(schedule => (
        {
            title: `${schedule.pet.name} - ${schedule.client.name}`,
            date: schedule.start_at,
            end: schedule.finish_at,
            extendedProps: {
                user: schedule.user,
                client: schedule.client,
                pet: schedule.pet,
            },
        }
    ))
}

const calendar = ref<InstanceType<typeof FullCalendar>>()
const {
    handleHiddenMenu,
    handleSelect,
    menuTarget,
    showPopup,
    popupPosition,
} = useSchedulePopup(calendar)

const calendarOptions: CalendarOptions = {
    locale: localePtBr,
    initialView: 'timeGridWeek',
    headerToolbar: {
        left: '',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,prev,next',
    },
    plugins: [
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
    // events: 'https://fullcalendar.io/api/demo-feeds/events.json',
    // dateClick: handleDateClick,
    // dateClick: (e) => {
    //     console.log(e)
    // },
    select: (e) => {
        if (isPast(e.start)) {
            return
        }

        prefilledScheduleData.start_at = format(e.start, 'dd/MM/yyyy HH:mm')
        prefilledScheduleData.duration = differenceInMinutes(e.end, e.start)
        handleSelect(e)
    },
    // unselect: (e) => {
    //     // console.log({ unselecto: e })
    //     // nextTick(() => {
    //     //     showPopup.value = false
    //     //     menuTarget.value = '#menu-fall-back'
    //     // })
    // }
    // eventMouseEnter: (e) => e.el.classList.add('shadow-3'),
    // eventMouseLeave: (e) => e.el.classList.remove('shadow-3'),
}
</script>

<style scoped>
.schedule-index {
    padding-top: 30px;
}

.schedule-popover {
    height: 100%;
}

:deep(.fc-event:hover) {
    box-shadow: 0 1px 8px rgb(0 0 0 / 20%), 0 3px 4px rgb(0 0 0 / 14%), 0 3px 3px -2px rgb(0 0 0 / 12%) !important;
}
</style>
