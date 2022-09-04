import { ProductModel } from 'src/features/products/models/ProductModel'

export interface ScheduleHasProductModel {
    id: number,
    account_id: number,
    product_id: number,
    quantity: number
    price: number
    discount: number
    created_at: string,
    updated_at: string,
    product: ProductModel,
}
