<template>
    <div>
        <q-list padding style="margin-top: 150px;">
            <q-item clickable v-ripple :to="{ name: 'schedule.index' }">
                <q-item-section avatar>
                    <q-icon name="calendar_today"/>
                </q-item-section>

                <q-item-section>
                    Agendamento
                </q-item-section>
            </q-item>
            <q-item clickable v-ripple :to="{ name: 'client.index' }">
                <q-item-section avatar>
                    <q-icon name="group"/>
                </q-item-section>

                <q-item-section>
                    Clientes
                </q-item-section>
            </q-item>
            <q-item clickable v-ripple :to="{ name: 'product.index' }">
                <q-item-section avatar>
                    <q-icon name="shopping_bag"/>
                </q-item-section>

                <q-item-section>
                    Produtos
                </q-item-section>
            </q-item>
        </q-list>
    </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>

</style>
