import { api } from 'boot/axios'
import { ClientModel } from 'src/features/client/models/ClientModel'
import { PaginatedServerResponse } from 'src/models/ApiModels'
import { ScheduleModel } from 'src/features/schedule/models/ScheduleModel'

export async function list(params: {
    start_at_start?: string
    start_at_end?: string
    user_id?: string
    include?: ('user' | 'client' | 'pet')[]
}): Promise<PaginatedServerResponse<ScheduleModel>> {
    const includeAsString = params.include?.join(',')
    const response = await api.get<PaginatedServerResponse<ScheduleModel>>('schedules', { params: { ...params, include: includeAsString } })

    return response.data
}

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

interface CreateInput {
    client_id: number
    pet_id: number
    user_id: number
    type: number
    start_at: number
    datetime: string
    description?: string
    status?: string
}
export async function create(data: CreateInput) {
    const response = await api.post('schedule', { ...data, status: 1 })

    return response.data
}

export default {
    list,
    listAvailableProfessionals,
    create,
}
