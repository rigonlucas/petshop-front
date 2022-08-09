import { ref } from 'vue'
import { QSelectOption } from 'quasar'
import { PaginatedServerResponse } from 'src/models/ApiModels'
import { ClientModel } from 'src/features/client/models/ClientModel'

export interface DetailedSelectOption<Ts> extends QSelectOption<number> {
    details?: Ts,
}

interface BasicResponseResourceData {
    id: number
    name: string,
}

export default function useSelectAjaxOptions<DetailsData extends BasicResponseResourceData>(fetchCallback: (input: string, page: number) => Promise<PaginatedServerResponse<DetailsData>>) {
    const options = ref<DetailedSelectOption<ClientModel>[]>([])
    const lastPageReached = ref<boolean>(false)
    const nextPage = ref<number>(1)
    const curentFilter = ref<string>('')
    const isLoading = ref<boolean>(false)

    async function handleFilter(input: string, update: any) {
        curentFilter.value = input
        nextPage.value = 1
        options.value = []
        await fetchAndAssignData(curentFilter.value, nextPage.value)
        update()
    }

    async function handleOnScroll({ index, direction }: {index: number, direction: string}) {
        const indexToFetch: number | null = options.value && options.value.length - 7
        if (lastPageReached.value || isLoading.value || index < indexToFetch || direction !== 'increase') {
            return
        }
        await fetchAndAssignData(curentFilter.value, nextPage.value)
    }

    async function fetchAndAssignData(input: string, page: number) {
        try {
            isLoading.value = true
            const { data, meta } = await fetchCallback(input, page)
            nextPage.value = meta.current_page + 1
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
