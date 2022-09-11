import { DetailedSelectOption } from 'src/composables/select/useSelectAjaxOptions'
import { ClientModel } from 'src/features/client/models/ClientModel'
import { PetModel } from 'src/features/pet/models/PetModel'
import UserModel from 'src/features/user/models/UserModel'
import { ProductModel } from 'src/features/products/models/ProductModel'
import { ScheduleTypes } from 'src/features/schedule/models/ScheduleModel'

export interface AddProductsFormData {
    id?: number
    product_id: number|null,
    product: ProductModel|null,
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
}
