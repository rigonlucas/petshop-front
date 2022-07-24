import { ref } from 'vue'
import { QSelectOption } from 'quasar'

interface ResponseResourceItemData {
    id: number
    name: string,
}

type FetchCallback = (params: any) => Promise<ResponseResourceItemData[]>

export default function useSelectAjaxOptions(fetchCallback: FetchCallback) {
    const lastFilter = ref<string>('')
    const options = ref<QSelectOption<number>[] | null>(null)

    async function handleFilter(input: string, update: any) {
        if (options.value && lastFilter.value === input) {
            update()
            return
        }

        const data = await fetchCallback({ name_like: input })
        update(() => {
            lastFilter.value = input
            options.value = data.map((resourceItem: ResponseResourceItemData) => {
                return {
                    label: resourceItem.name,
                    value: resourceItem.id,
                }
            })
        })
    }

    // const isLoading = ref<boolean>(false)
    // const pages = 2
    // function handleOnScroll({ to, ref }) {
    //     if (isLoading.value )
    // }

    return { handleFilter, options }
}
