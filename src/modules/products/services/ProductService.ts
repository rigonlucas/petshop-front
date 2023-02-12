import { api } from 'boot/axios'
import { PaginatedServerResponse } from 'src/models/ApiModels'
import { ProductModel } from 'src/modules/products/models/ProductModel'
import { ProductFormData } from 'src/modules/products/models/ProductFormData'

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

export async function get(id: number) {
    const response = await api.get(`products/${id}`)

    return response.data.data as ProductModel
}

export async function remove(id: number) {
    return await api.delete(`products/${id}`)
}

export async function create(product: ProductFormData) {
    const response = await api.post('products', product)

    return response.data.data as ProductModel
}

export async function update(id: number, product: ProductFormData) {
    const response = await api.put(`products/${id}`, product)

    return response.data.data as ProductModel
}

export default {
    list,
    get,
    create,
    update,
    remove,
}
