import { QSelectOption } from 'quasar'

export default function useHelpers<ValueType>() {
    function primitivesToQSelectOptions(options: ValueType[]): QSelectOption<ValueType>[] {
        if (options[0] && ['string', 'number'].includes(typeof options[0])) {
            return options.map((option) => ({
                label: `${option}`,
                value: option
            }))
        }
        return []
    }

    return { primitivesToQSelectOptions }
}
