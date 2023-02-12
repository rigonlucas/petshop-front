import { DetailedSelectOption } from 'src/composables/select/useSelectAjaxOptions'
import { ClientModel } from 'src/modules/client/models/ClientModel'
import { PetModel } from 'src/modules/pet/models/PetModel'
import UserModel from 'src/modules/user/models/UserModel'
import { ProductModel } from 'src/modules/products/models/ProductModel'
import { ScheduleTypes } from 'src/modules/schedule/models/ScheduleModel'
import { VaccineModel } from 'src/modules/vaccine/models/VaccineModel'

export interface AddProductsFormData {
    id?: number
    product_id: number|null,
    product: ProductModel|null,
    quantity: number|null,
    price: number|null,
    final_price: number|null,
    discount: number|null,
}

export interface AddVaccinesFormData {
    id?: number
    product_id: number|null,
    product: VaccineModel|null,
    quantity: number|null,
    price: number|null,
    final_price: number|null,
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
    vaccines?: AddVaccinesFormData[] | null,
}
