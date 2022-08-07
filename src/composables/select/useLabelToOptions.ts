import { QSelectOption } from 'quasar'

interface OptionsMap {
    [key: number]: string,
}

export default function useLabelToOptions(optionsMap: OptionsMap): QSelectOption[] {
    const options: QSelectOption[] = []

    for (const optionsMapKey in optionsMap) {
        options.push({
            label: optionsMap[optionsMapKey],
            value: optionsMapKey,
        })
    }
    return options
}
