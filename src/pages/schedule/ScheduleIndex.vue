<template>
  <q-page class="schedule-index">
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
              <full-calendar :options="calendarOptions" />
          </div>
      </div>
      <router-view />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

export default defineComponent({
    name: 'IndexPage',
    components: {
        FullCalendar,
    },
    setup () {
        const calendarOptions = {
            plugins: [
                dayGridPlugin,
                interactionPlugin,
            ],
            initialView: 'dayGridMonth',
        }

        return { calendarOptions }
    }
})
</script>

<style scoped>
.schedule-index {
    padding-top: 30px;
}
</style>
