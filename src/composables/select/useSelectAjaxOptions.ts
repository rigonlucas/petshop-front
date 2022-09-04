import { ref } from 'vue'
import { QSelectOption } from 'quasar'
import { PaginatedServerResponse } from 'src/models/ApiModels'
import { ClientModel } from 'src/features/client/models/ClientModel'

export interface DetailedSelectOption<Ts> extends QSelectOption<number> {
    details: Ts,
}

interface BasicResponseResourceData {
    id: number
    name: string,
}

export default function useSelectAjaxOptions<DetailsData extends BasicResponseResourceData>(fetchCallback: (input: string, cursor: string|null) => Promise<PaginatedServerResponse<DetailsData>>) {
    const options = ref<DetailedSelectOption<ClientModel>[]>([])
    const lastPageReached = ref<boolean>(false)
    const nextPageCursor = ref<string|null>(null)
    const curentFilter = ref<string>('')
    const isLoading = ref<boolean>(false)

    async function handleFilter(input: string, update: any) {
        curentFilter.value = input
        options.value = []
        await fetchAndAssignData(curentFilter.value, nextPageCursor.value)
        update()
    }

    async function handleOnScroll({ index, direction }: {index: number, direction: string}) {
        const indexToFetch: number | null = options.value && options.value.length - 7
        if (lastPageReached.value || isLoading.value || index < indexToFetch || direction !== 'increase') {
            return
        }
        await fetchAndAssignData(curentFilter.value, nextPageCursor.value)
    }

    async function fetchAndAssignData(input: string, cursor: string|null) {
        try {
            isLoading.value = true
            const { data, meta } = await fetchCallback(input, cursor)
            nextPageCursor.value = meta.next_cursor
            lastPageReached.value = data.length < meta.per_page
            const selecOptions = data.map((resourceItem) => {
                return {
                    label: resourceItem.name,
                    value: resourceItem.id,
                    details: resourceItem as any
                }
            })
            options.value = options.value.concat(selecOptions)
            isLoading.value = false
        } catch (e) {
            isLoading.value = false
        }
    }

    return { handleFilter, options, handleOnScroll, isLoading }
}
