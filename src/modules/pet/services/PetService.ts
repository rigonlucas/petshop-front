import { api } from 'boot/axios'
import { ClientModel } from 'src/modules/client/models/ClientModel'
import { PaginatedServerResponse } from 'src/models/ApiModels'

export async function list(params: any): Promise<PaginatedServerResponse<ClientModel>> {
    const response = await api.get<PaginatedServerResponse<ClientModel>>('pets', { params: { ...params } })

    return response.data
}

export default {
    list,
}
