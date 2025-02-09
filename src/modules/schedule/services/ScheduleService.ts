import { api } from 'boot/axios'
import { ClientModel } from 'src/modules/client/models/ClientModel'
import { PaginatedServerResponse } from 'src/models/ApiModels'
import { ScheduleModel } from 'src/modules/schedule/models/ScheduleModel'
import { ScheduleHasProductModel } from 'src/modules/schedule/models/ScheduleHasProductModel'

export async function list(params: {
    start_at_start?: string
    start_at_end?: string
    user_id?: string
    include?: string
}): Promise<PaginatedServerResponse<ScheduleModel>> {
    const response = await api.get<PaginatedServerResponse<ScheduleModel>>('schedules', { params })

    return response.data
}

export interface WorkerModel {
    id: number,
    name: string,
}
export async function listAvailableProfessionals(params: {
    date_time: string
    duration: number
}, cursor: string): Promise<PaginatedServerResponse<WorkerModel>> {
    const response = await api.get<PaginatedServerResponse<ClientModel>>('schedules/professionals/available', { params: { ...params, cursor } })

    return response.data
}

interface ScheduleInput {
    client_id: number
    pet_id: number
    user_id: number
    type: number
    start_at: number
    datetime: string
    description?: string
    status?: string
}
export async function create(data: ScheduleInput) {
    const response = await api.post('schedules', { ...data, status: 1 })

    return response.data
}

export async function edit(id: number, data: ScheduleInput) {
    const response = await api.put(`schedules/${id}`, { ...data, status: 1 })

    return response.data
}

export async function get(id: number, params?: {
    include?: string
}) {
    const response = await api.get(`schedules/${id}`, { params })

    return response.data.data as ScheduleModel
}

interface addProductInput {
    product_id: number
    quantity: number
    price: number
    discount?: number
}

export async function addProduct(scheduleId: number, data: addProductInput) {
    const response = await api.post(`schedules/${scheduleId}/products`, data)

    return response.data.data as ScheduleHasProductModel
}

export async function removeProduct(scheduleId: number, productPivotId: number) {
    const response = await api.delete(`schedules/${scheduleId}/products/${productPivotId}`)

    return response.data
}

export default {
    list,
    listAvailableProfessionals,
    create,
    edit,
    get,
    addProduct,
    removeProduct,
}
