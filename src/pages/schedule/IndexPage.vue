<template>
  <q-page class="row items-center justify-evenly">
    <input v-model="name"/>
    {{ name }}
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    name: 'IndexPage',
    setup () {
        const name = ref<string>('teste')

        return { name }
    }
})
</script>
