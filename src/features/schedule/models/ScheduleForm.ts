import { DetailedSelectOption } from 'src/composables/select/useSelectAjaxOptions'
import { ClientModel } from 'src/features/client/models/ClientModel'
import { PetModel } from 'src/features/pet/models/PetModel'
import UserModel from 'src/features/user/models/UserModel'
import { ProductModel } from 'src/features/products/models/ProductModel'
import { ScheduleHasProductModel } from 'src/features/schedule/models/ScheduleHasProductModel'

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
} as {
    [key: number]: string
}

export interface AddProductsFormData {
    product_id: number|null,
    product: ProductModel|null,
    quantity: number|null,
    price: number|null,
    discount: number|null,
}

export interface ScheduleFormData {
    client?: DetailedSelectOption<ClientModel> | null,
    pet?: DetailedSelectOption<PetModel> | null,
    type?: DetailedSelectOption<ScheduleTypes> | null,
    duration?: number | null,
    start_at?: string | null,
    user?: DetailedSelectOption<UserModel> | null,
    description?: string | null,
    products?: AddProductsFormData[] | null,
}
