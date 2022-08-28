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

export default {
    list,
}
