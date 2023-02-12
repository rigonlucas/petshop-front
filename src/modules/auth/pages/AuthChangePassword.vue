<template>
    <div class="auth-login">
        <div class="row">
            <div class="col text-center">
                <h3>Alterar senha</h3>
            </div>
        </div>
        <ChangePasswordForm :hash="props.hash"/>
    </div>
</template>

<script setup lang="ts">

import ChangePasswordForm from 'src/modules/auth/components/ChangePasswordForm.vue'
import { defineProps } from 'vue'

const props = defineProps({
    hash: {
        type: String,
        required: true,
    }
})

</script>
