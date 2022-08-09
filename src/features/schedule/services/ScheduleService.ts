import { api } from 'boot/axios'
import { ClientModel } from 'src/features/client/models/ClientModel'
import { PaginatedServerResponse } from 'src/models/ApiModels'

export interface WorkerModel {
    id: number,
    name: string,
}

export async function listAvailableProfessionals(params: {
    date_time: string
    duration: number
}, page: number): Promise<PaginatedServerResponse<WorkerModel>> {
    const response = await api.get<PaginatedServerResponse<ClientModel>>('schedules/professionals/available', { params: { ...params, page } })

    return response.data
}

export default {
    listAvailableProfessionals,
}
