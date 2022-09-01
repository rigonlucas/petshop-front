import { MetaResponse, PaginatedServerResponse } from 'src/models/ApiModels'
import { computed, ref, UnwrapRef } from 'vue'
import axios, { AxiosError } from 'axios'

export default async function usePaginatedResourceListing<ModelResource>(
    fetchCallback: (page: number) => Promise<PaginatedServerResponse<ModelResource>>,
    onError?: (error: AxiosError) => void
) {
    const data = ref<ModelResource[]>([])
    const meta = ref<MetaResponse|null>(null)
    const currentPage = ref<number>(1)
    const isLoading = ref<boolean>(false)

    async function fetchData(page: number) {
        isLoading.value = true
        try {
            const response = await fetchCallback(page)
            data.value = response.data as UnwrapRef<ModelResource[]>
            meta.value = response.meta
            currentPage.value = meta.value.current_page
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
        await fetchData(Math.max(1, currentPage.value - 1))
    }
    async function fetchNextPage() {
        await fetchData(currentPage.value + 1)
    }

    // corrigir
    const hasPreviousPage = computed(() => meta.value && (currentPage.value > 0 && meta.value.last_page <= currentPage.value))
    const hasNextPage = computed(() => meta.value && (currentPage.value < meta.value.last_page))
    await fetchData(currentPage.value)

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
