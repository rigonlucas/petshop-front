<template>
    <div class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
        <div>
            <div style="font-size: 30vh">
                404
            </div>

            <div class="text-h2" style="opacity:.4">
                Oops. Esta página não existe...
            </div>
            <div class="text-h1 text-danger" style="opacity:.4">
                <q-icon name="sentiment_dissatisfied" />
            </div>
            <q-btn
                class="q-mt-xl"
                color="white"
                push
                text-color="blue"
                unelevated
                to="/"
                size="xl"
                label="Voltar"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'ErrorNotFound'
})
</script>
