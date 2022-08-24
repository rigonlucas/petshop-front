import { api } from 'boot/axios'
import { ClientModel } from 'src/features/client/models/ClientModel'
import { PaginatedServerResponse } from 'src/models/ApiModels'

export async function list(params: any): Promise<PaginatedServerResponse<ClientModel>> {
    const includeAsString = params.include?.join(',')
    const includeCountAsString = params.include_count?.join(',')
    const response = await api.get<PaginatedServerResponse<ClientModel>>('clients', {
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
