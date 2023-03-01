<template>
    <div class="row">
        <div class="col">
           <CardExport/>
        </div>
        <div class="col">
            Coluna 2
        </div>
        <div class="col">
            Coluna 3
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CardExport from 'src/modules/exports/generic/components/CardExport.vue'

export default defineComponent({
    components: { CardExport },
})
</script>
