import { api } from 'boot/axios'
import { PaginatedServerResponse } from 'src/models/ApiModels'
import { ProductModel } from 'src/features/products/models/ProductModel'

export async function list(params: any): Promise<PaginatedServerResponse<ProductModel>> {
    const includeAsString = params.include?.join(',')
    const includeCountAsString = params.include_count?.join(',')
    const response = await api.get<PaginatedServerResponse<ProductModel>>('products', {
        params: {
            ...params,
            include: includeAsString,
            include_count: includeCountAsString,
        },
    })

    return response.data
}

interface ProductInput {
    name: string
    description?: string|null
    type: number
    cost?: number|null
    price: number
    measurement_unit: number
}

export async function get(id: number) {
    const response = await api.get(`product/${id}`)

    return response.data.data as ProductModel
}

export async function remove(id: number) {
    const response = await api.delete(`product/${id}`)

    return response.data.data as ProductModel
}

export async function create(product: ProductInput) {
    const response = await api.post('product', product)

    return response.data as ProductModel
}

export async function update(id: number, product: ProductInput) {
    const response = await api.put(`product/${id}`, product)

    return response.data as ProductModel
}

export default {
    list,
    get,
    create,
    update,
    remove,
}
