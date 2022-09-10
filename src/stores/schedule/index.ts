import { defineStore } from 'pinia'
import { LocalStorage } from 'quasar'

export const useScheduleStore = defineStore('schedule', {
    state: () => ({
        selectedView: LocalStorage.getItem('callendar-view') || 'timeGridWeek',
    }),
    getters: {
    },
    actions: {
        setSelectedView(viewName: string) {
            this.selectedView = viewName
            LocalStorage.set('callendar-view', viewName)
        },
    },
})
