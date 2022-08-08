import { PaginatedServerResponse } from 'src/models/ApiModels'
import { api } from 'boot/axios'
import UserModel from 'src/features/user/models/UserModel'

export async function list(params?: any): Promise<PaginatedServerResponse<UserModel>> {
    const response = await api.get<PaginatedServerResponse<UserModel>>('account/users', { params: { ...params } })

    return response.data
}

export default {
    list,
}
