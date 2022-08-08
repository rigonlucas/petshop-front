import { api } from 'boot/axios'
import { ClientModel } from 'src/features/client/models/ClientModel'
import { PaginatedServerResponse } from 'src/models/ApiModels'

export interface WorkerModel {
    id: number,
    name: string,
}

export async function listAvailableWorkers(params: any): Promise<PaginatedServerResponse<WorkerModel>> {
    const response = await api.get<PaginatedServerResponse<ClientModel>>('clients', { params: { ...params } })

    return response.data
}
