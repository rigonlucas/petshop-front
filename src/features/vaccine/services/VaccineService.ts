import { api } from 'boot/axios'

export async function list() {
    const response = await api.get('vaccines')

    return response.data
}

export default {
    list
}
