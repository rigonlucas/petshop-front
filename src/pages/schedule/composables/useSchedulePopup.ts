import { Ref, ref } from 'vue'
import FullCalendar, { DateSelectArg, EventInput } from '@fullcalendar/vue3'

interface Position {
    anchor: string,
    self?: string,
    cover?: boolean,
}
const DEFAULT_POSITIONS: Position = {
    anchor: 'top right',
    self: 'center left',
}
const BOTTOM_POSITIONS: Position = {
    anchor: 'center middle',
    cover: true,
}

interface GridTypePosition {
    [key: string]: Position
}
const GRID_TYPE_POSITION: GridTypePosition = {
    timeGridDay: BOTTOM_POSITIONS,
}

export function useSchedulePopup(calendarRef: Ref<InstanceType<typeof FullCalendar> | undefined>) {
    const showPopup = ref(false)
    const popupPosition = ref(DEFAULT_POSITIONS)
    const menuTarget = ref('#popover-fall-back')
    const tempEvent = ref<EventInput>({
        title: 'Novo agendamento',
        className: 'temp-event'
    })

    function removeFakeEvent() {
        const fakeEvent = calendarRef.value?.getApi().getEventById('fake-event')
        if (fakeEvent) {
            fakeEvent.remove()
        }
    }

    function handleHiddenMenu() {
        removeFakeEvent()
        showPopup.value = false
        menuTarget.value = '#popover-fall-back'
    }

    function createFakeEvent(event: DateSelectArg) {
        tempEvent.value.id = 'fake-event'
        tempEvent.value.start = event.start
        tempEvent.value.end = event.end
        event.view.calendar.addEvent(tempEvent.value)
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function openPopup(event: DateSelectArg) {
        console.log(event.view.type)
        popupPosition.value = GRID_TYPE_POSITION[event.view.type] ?? DEFAULT_POSITIONS
        menuTarget.value = '.temp-event'
        showPopup.value = true
    }

    function handleSelect(event: DateSelectArg) {
        console.log({ select: event })
        removeFakeEvent()
        createFakeEvent(event)
        openPopup(event)
    }

    return {
        handleHiddenMenu,
        handleSelect,
        showPopup,
        menuTarget,
        popupPosition,
    }
}
