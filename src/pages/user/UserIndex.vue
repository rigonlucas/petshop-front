<template>
    <div class="q-pa-lg">
        <q-table
            title="Usuários"
            row-key="name"
            :rows="data"
            :columns="columns"
            :loading="isLoading"
            :rows-per-page-options="[0]"
            grid
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
            <template v-slot:item="props">
                <div class="q-pa-xs col-lg-3 col-md-4 col-sm-12 col-xs-12 ">
                    <UserCard
                        :id="props.row.id"
                        :name="props.row.name"
                        :email="props.row.email"
                        :deleted_at="props.row.deleted_at"
                        @update:user="fetchData"
                    />
                </div>
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
import { notifyNegative } from 'src/utils/NotifyHelper'
import usePaginatedResourceListing from 'src/composables/fetch/usePaginatedResourceListing'
import UserService from 'src/features/user/services/UserService'
import UserModel from 'src/features/user/models/UserModel'
import UserCard from 'pages/user/components/UserCard.vue'

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
