import { QSelectOption } from 'quasar'

export default function useHelpers() {
    function primitivesToQSelectOptions(options: number[]|string[]): QSelectOption[] {
        if (options[0] && ['string', 'number'].includes(typeof options[0])) {
            return options.map((option) => ({
                label: option.toString(),
                value: option.toString()
            }))
        }
        return []
    }

    return { primitivesToQSelectOptions }
}
