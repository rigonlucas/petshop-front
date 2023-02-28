import { PaginatedServerResponse } from 'src/models/ApiModels'
import { api } from 'boot/axios'
import ProcessModel from 'src/modules/Notifications/Process/models/ProcessModel'

export async function list(params?: any): Promise<PaginatedServerResponse<ProcessModel>> {
    const response = await api.get<PaginatedServerResponse<ProcessModel>>('managers/exports/all', { params: { ...params } })

    return response.data
}

export default {
    list,
}
