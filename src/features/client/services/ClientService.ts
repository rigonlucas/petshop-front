import { api } from 'boot/axios'
import { ClientModel } from 'src/features/client/models/ClientModel'
import { PaginatedServerResponse } from 'src/models/ApiModels'

interface ClientInput {
    name: string
    email?: string|null
    phone?: string|null
}

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

export async function get(id: number) {
    const response = await api.get(`client/${id}`)

    return response.data.data as ClientModel
}

export async function remove(id: number) {
    return await api.delete(`client/${id}`)
}

export async function create(client: ClientInput) {
    const response = await api.post('client', client)

    return response.data.data as ClientModel
}

export async function update(id: number, client: ClientInput) {
    const response = await api.put(`client/${id}`, client)

    return response.data.data as ClientModel
}

export default {
    list,
    get,
    create,
    update,
    remove
}
