<template>
    <div>
        <q-list padding style="margin-top: 150px;">
            <q-item clickable v-ripple :to="{ name: 'home' }">
                <q-item-section avatar>
                    <q-icon name="dashboard"/>
                </q-item-section>

                <q-item-section>
                    Dashboard
                </q-item-section>
            </q-item>
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
            <q-expansion-item
                expand-separator
                icon="trending_up"
                label="Relatórios"
            >
                <q-list>
                    <q-item clickable v-ripple :to="{ name: 'product.index' }">
                        <q-item-section avatar>
                            <q-icon size="xs" right name="schedule"/>
                        </q-item-section>
                        <q-item-section>
                            Agendamentos
                        </q-item-section>
                    </q-item>
                    <q-item clickable v-ripple :to="{ name: 'product.index' }">
                        <q-item-section avatar>
                            <q-icon size="xs" right name="person"/>
                        </q-item-section>
                        <q-item-section>
                            Clientes
                        </q-item-section>
                    </q-item>
                    <q-item clickable v-ripple :to="{ name: 'product.index' }">
                        <q-item-section avatar>
                            <q-icon size="xs" right name="pets"/>
                        </q-item-section>
                        <q-item-section>
                            Pets
                        </q-item-section>
                    </q-item>
                    <q-item clickable v-ripple :to="{ name: 'product.index' }">
                        <q-item-section avatar>
                            <q-icon size="xs" right name="paid"/>
                        </q-item-section>
                        <q-item-section>
                            Vendas
                        </q-item-section>
                    </q-item>
                </q-list>
            </q-expansion-item>
        </q-list>
    </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>

</style>
