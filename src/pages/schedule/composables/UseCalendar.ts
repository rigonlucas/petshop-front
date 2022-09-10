import FullCalendar from '@fullcalendar/vue3'
import { onMounted, ref, Ref } from 'vue'
import { useScheduleStore } from 'stores/schedule'

export function useCalendar(calendar: Ref<InstanceType<typeof FullCalendar> | undefined>) {
    const currentDateString = ref('')
    function updateCurrentDateString() {
        if (!calendar.value) return

        currentDateString.value = calendar.value?.getApi().getCurrentData().viewTitle
    }
    onMounted(() => {
        updateCurrentDateString()
    })

    function goPrevious() {
        if (!calendar.value) return

        calendar.value.getApi().prev()
        updateCurrentDateString()
    }

    function goNext() {
        if (!calendar.value) return

        calendar.value.getApi().next()
        updateCurrentDateString()
    }

    function goToday() {
        if (!calendar.value) return

        calendar.value.getApi().today()
        updateCurrentDateString()
    }

    function changeView(viewName: string) {
        if (!calendar.value) return

        calendar.value.getApi().changeView(viewName)
        useScheduleStore().setSelectedView(viewName)
        updateCurrentDateString()
    }

    return {
        goPrevious,
        goNext,
        goToday,
        changeView,
        currentDateString,
    }
}
