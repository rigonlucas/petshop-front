import { ProductTypes } from 'src/features/products/models/ProductModel'

export interface ProductFormData {
    name?: string
    description?: string|null
    type?: ProductTypes
    cost?: number
    price?: number
}
