<template>
    <div>
        <div class="row">
            <div class="col text-center">
                <h3>Registro</h3>
            </div>
        </div>
        <register-form :code="props.code" />
    </div>
</template>

<script setup lang="ts">

import RegisterForm from 'src/features/auth/components/RegisterForm.vue'
import { defineProps } from 'vue'

const props = defineProps({
    code: {
        type: String,
        required: true,
    }
})
</script>
