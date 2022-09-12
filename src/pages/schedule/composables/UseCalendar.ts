import FullCalendar from '@fullcalendar/vue3'
import { onMounted, ref, Ref } from 'vue'
import { useScheduleStore } from 'stores/schedule'

export function useCalendar(
    calendar: Ref<InstanceType<typeof FullCalendar> | undefined>,
    onUserAction?: () => void,
) {
    const currentDateString = ref('')
    function updateCurrentDateString() {
        if (!calendar.value) return

        currentDateString.value = calendar.value?.getApi().getCurrentData().viewTitle
    }
    function triggerOnChengeEvents() {
        onUserAction && onUserAction()
        updateCurrentDateString()
    }
    onMounted(() => {
        updateCurrentDateString()
    })

    function goPrevious() {
        if (!calendar.value) return

        calendar.value.getApi().prev()
        triggerOnChengeEvents()
    }

    function goNext() {
        if (!calendar.value) return

        calendar.value.getApi().next()
        triggerOnChengeEvents()
    }

    function goToday() {
        if (!calendar.value) return

        calendar.value.getApi().today()
        triggerOnChengeEvents()
    }

    function changeView(viewName: string) {
        if (!calendar.value) return

        calendar.value.getApi().changeView(viewName)
        useScheduleStore().setSelectedView(viewName)
        triggerOnChengeEvents()
    }

    return {
        goPrevious,
        goNext,
        goToday,
        changeView,
        currentDateString,
    }
}
