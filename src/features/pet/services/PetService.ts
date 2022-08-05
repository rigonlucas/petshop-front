import { api } from 'boot/axios'
import { ClientModel } from 'src/features/client/models/ClientModel'

interface MetaResponse {
    current_page: number
    last_page: number
    per_page: number
    total: number
}

export interface PaginatedServerResponse<DataT> {
    data: DataT[]
    meta: MetaResponse
}

export async function list(params: any): Promise<PaginatedServerResponse<ClientModel>> {
    const response = await api.get<PaginatedServerResponse<ClientModel>>('pets', { params: { ...params } })

    return response.data
}

export default {
    list,
}
