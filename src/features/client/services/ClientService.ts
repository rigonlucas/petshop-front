import { api } from 'boot/axios'
import { ClientModel } from 'src/features/client/models/ClientModel'
// import { AxiosResponse } from 'axios'

// interface ServerResponse {
//     data: ClientModel[]
// }

export async function list(params: any): Promise<ClientModel[]> {
    const {
        _limit = 3,
    } = params
    const response = await api.get<ClientModel[]>('clients', { params: { _limit, ...params } })

    return response.data
}

export default {
    list,
}
