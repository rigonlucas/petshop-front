import { api } from 'boot/axios'
import { email } from '@vuelidate/validators'
import { RegisterModel } from 'src/features/auth/models/RegisterModel'

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
    const { data } = await api.post<ResponseData>('/login', { email, password })

    return data.data as LoginResponseData
}

export async function forgotPassword(email: string) {
    const { data } = await api.patch<ResponseData>('/forgot-password', { email })

    return data.data as LoginResponseData
}

export async function changePassword(
    email: string, password: string, password_confirmation: string, hash: string
) {
    const { data } = await api.patch<ResponseData>('/update-password/' + hash, { email, password, password_confirmation })

    return data.data as LoginResponseData
}

export async function registerAccount(registerModel: RegisterModel) {
    const { data } = await api.post<ResponseData>('/register', registerModel)

    return data.data as LoginResponseData
}

export async function logout() {
    await api.get<ResponseData>('/logout')
}

export default {
    login,
    logout,
    forgotPassword,
    changePassword,
    registerAccount,
}
