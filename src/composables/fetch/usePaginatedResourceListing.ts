import { MetaResponse, PaginatedServerResponse } from 'src/models/ApiModels'
import { computed, ref, UnwrapRef } from 'vue'
import axios, { AxiosError } from 'axios'

export default async function usePaginatedResourceListing<ModelResource>(
    fetchCallback: (cursor?: string) => Promise<PaginatedServerResponse<ModelResource>>,
    onError?: (error: AxiosError) => void
) {
    const data = ref<ModelResource[]>([])
    const meta = ref<MetaResponse|null>(null)
    const previousCursor = ref<string>()
    const nextCursor = ref<string>()
    const isLoading = ref<boolean>(false)

    async function fetchData(cursor?: string) {
        isLoading.value = true
        try {
            const response = await fetchCallback(cursor)
            data.value = response.data as UnwrapRef<ModelResource[]>
            meta.value = response.meta
            previousCursor.value = meta.value.prev_cursor
            nextCursor.value = meta.value.next_cursor
        } catch (error) {
            if (!axios.isAxiosError(error)) {
                throw error
            }
            onError && onError(error)
        } finally {
            isLoading.value = false
        }
    }

    async function fetchPreviousPage() {
        await fetchData(previousCursor.value)
    }
    async function fetchNextPage() {
        await fetchData(nextCursor.value)
    }

    // corrigir
    const hasPreviousPage = computed(() => !!previousCursor.value)
    const hasNextPage = computed(() => !!nextCursor.value)
    await fetchData()

    return {
        data,
        meta,
        isLoading,
        hasPreviousPage,
        hasNextPage,
        fetchData,
        fetchNextPage,
        fetchPreviousPage,
    }
}
