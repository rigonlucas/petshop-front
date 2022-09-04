<template>
    <div class="q-pa-lg">
        <q-table
            title="Usuários"
            row-key="name"
            :rows="data"
            :columns="columns"
            :loading="isLoading"
            :rows-per-page-options="[0]"
        >
            <template v-slot:loading>
                <q-inner-loading showing color="primary"/>
            </template>
            <template v-slot:top-right>
                <q-input
                    v-model="userName"
                    placeholder="Nome do usuário"
                    :debounce="300"
                >
                    <template v-slot:append>
                        <q-icon name="search" />
                    </template>
                </q-input>
            </template>
            <template #body-cell-options="{ row }: { row: ProductModel }">
                <q-td :id="row.id">
                    <div class="flex">
                        <q-btn
                            color="primary"
                            size="xs"
                            icon="visibility"
                        />
                        <q-btn
                            color="warning"
                            size="xs"
                            icon="edit"
                        />
                        <q-btn
                            color="red"
                            size="xs"
                            icon="delete"
                        />
                    </div>
                </q-td>
            </template>
            <template #pagination>
                <q-btn
                    icon="chevron_left"
                    color="grey-8"
                    round
                    dense
                    flat
                    :disable="!hasPreviousPage"
                    @click="fetchPreviousPage"
                />
                <q-btn
                    icon="chevron_right"
                    color="grey-8"
                    round
                    dense
                    flat
                    :disable="!hasNextPage"
                    @click="fetchNextPage"
                />
            </template>
        </q-table>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { notifyNegative } from 'src/utils/Notify'
import usePaginatedResourceListing from 'src/composables/fetch/usePaginatedResourceListing'
import UserService from 'src/features/user/services/UserService'
import UserModel from 'src/features/user/models/UserModel'

const columns = [
    {
        name: 'name',
        label: 'Nome',
        align: 'left',
        field: 'name',
    },
    {
        name: 'email',
        label: 'Email',
        field: 'email',
        align: 'center',
        headerStyle: 'width: 100px',
    },
    {
        name: 'options',
        align: 'center',
        label: 'Opções',
        field: 'options',
        headerStyle: 'width: 230px',
    },
]

const userName = ref<string | null>(null)
watch(userName, async () => await fetchData())

const {
    fetchData,
    fetchNextPage,
    fetchPreviousPage,
    hasPreviousPage,
    hasNextPage,
    data,
    isLoading,
} = await usePaginatedResourceListing<UserModel>(async (cursor?: string) => {
    return await UserService.list({
        cursor,
        name: userName.value,
    })
},
(error) => notifyNegative(error.response && error.response.data.message)
)
</script>
