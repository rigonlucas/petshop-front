import { DetailedSelectOption } from 'src/composables/useSelectAjaxOptions'
import { ClientModel } from 'src/features/client/models/ClientModel'
import { PetModel } from 'src/features/pet/models/PetModel'

export interface FormData {
    client: DetailedSelectOption<ClientModel> | null,
    pet: DetailedSelectOption<PetModel> | null,
}
