import { DetailedSelectOption } from 'src/composables/select/useSelectAjaxOptions'

export function toDetailedSelectOption<Model>({ model }: { model: any }): DetailedSelectOption<Model> {
    return {
        label: model.name,
        value: model.id,
        details: model
    }
}
