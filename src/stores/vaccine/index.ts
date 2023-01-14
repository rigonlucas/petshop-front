import { defineStore } from 'pinia'
import { LocalStorage } from 'quasar'

export const useVaccineStore = defineStore('vaccine', {
    state: () => ({
        vaccines: LocalStorage.getItem('vaccines') || null,
    }),
    getters: {
        getVaccines(): any {
            return this.vaccines
        },
    },
    actions: {
        setSetVaccines(lsit: any) {
            this.vaccines = lsit
            LocalStorage.set('vaccines', lsit)
        },
    },
})
