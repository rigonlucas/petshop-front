import { api } from 'boot/axios'

interface AccountModel {
    id: number,
    name: string,
}

interface UserModel {
    id: number,
    name: string,
    email: string,
    account_id: number,
    account: AccountModel,
}

interface LoginResponseData {
    user: UserModel,
    token: string,
    expire_at: number,
}

export interface ResponseData {
    data: LoginResponseData
}

export async function login(email: string, password: string) {
    const { data } = await api.post<ResponseData>('http://localhost/api/login', { email, password })

    return data.data as LoginResponseData
}

export async function logout() {
    await api.get<ResponseData>('http://localhost/api/logout')
}

export default {
    login,
    logout,
}
