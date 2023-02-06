import { QSelectOption } from 'quasar'

interface OptionsMap {
    [key: string]: string,
}

export default function useConvertLabelMapToOptions(optionsMap: OptionsMap): QSelectOption[] {
    const options: QSelectOption[] = []

    for (const optionsMapKey in optionsMap) {
        options.push({
            label: optionsMap[optionsMapKey],
            value: optionsMapKey,
        })
    }
    return options
}
