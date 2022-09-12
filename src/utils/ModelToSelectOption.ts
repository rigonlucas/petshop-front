import { DetailedSelectOption } from 'src/composables/select/useSelectAjaxOptions'

export function toDetailedSelectOption<Model>(model: any): DetailedSelectOption<Model>|null {
    if (!model) {
        return null
    }
    return {
        label: model.name,
        value: model.id,
        details: model
    }
}
