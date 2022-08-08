import { QSelectOption } from 'quasar'
import { ref } from 'vue'

export default function useBasicSelectFilter(options: QSelectOption<string|number>[]) {
    const filteredOptions = ref(options)
    function handleFilterOptions(value: string, update: any) {
        if (!value) {
            update(() => {
                filteredOptions.value = options
            })
        }

        update(() => {
            const needle = value.toLowerCase()
            filteredOptions.value = options.filter((option) => option.label.toLowerCase().indexOf(needle) > -1)
        })
    }
    return { handleFilterOptions, filteredOptions }
}
