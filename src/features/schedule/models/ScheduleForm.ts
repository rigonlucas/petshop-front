import { DetailedSelectOption } from 'src/composables/select/useSelectAjaxOptions'
import { ClientModel } from 'src/features/client/models/ClientModel'
import { PetModel } from 'src/features/pet/models/PetModel'
import UserModel from 'src/features/user/models/UserModel'
import { QSelectOption } from 'quasar'

export enum ScheduleTypes {
    VETERINARIAN = 1,
    PET_CUT = 2,
    PET_SHOWER = 3,
    PET_CUT_SHOWER = 4
}

export const ScheduleTypesLabels = {
    [ScheduleTypes.VETERINARIAN]: 'Veterinario',
    [ScheduleTypes.PET_CUT]: 'Tosa',
    [ScheduleTypes.PET_SHOWER]: 'Banho',
    [ScheduleTypes.PET_CUT_SHOWER]: 'Banho e tosa',
}

export interface FormData {
    client: DetailedSelectOption<ClientModel> | null,
    pet: DetailedSelectOption<PetModel> | null,
    type: QSelectOption<ScheduleTypes> | null,
    duration: number | null,
    start_at: string | null,
    user: DetailedSelectOption<UserModel> | null,
    observation: string | null,
}
