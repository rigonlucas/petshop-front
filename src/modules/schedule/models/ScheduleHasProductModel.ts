import { ProductModel } from 'src/modules/products/models/ProductModel'

export interface ScheduleHasProductModel {
    id: number,
    product_id: number,
    quantity: number
    price: number
    final_price?: number
    discount: number
    created_at: string,
    updated_at: string,
    product?: ProductModel,
}
