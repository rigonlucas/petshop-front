import { PaginatedServerResponse } from 'src/models/ApiModels'
import { api } from 'boot/axios'
import UserModel from 'src/features/user/models/UserModel'

export async function list(params?: any): Promise<PaginatedServerResponse<UserModel>> {
    const response = await api.get<PaginatedServerResponse<UserModel>>('users', { params: { ...params } })

    return response.data
}

export async function changeStatus(userId: number): Promise<PaginatedServerResponse<UserModel>> {
    const response = await api.delete(`users/${userId}/change-status`)

    return response.data
}

export default {
    list,
    changeStatus,
}
