import { defineStore } from 'pinia'
import { LocalStorage } from 'quasar'
import { api } from 'boot/axios'

interface UserModel {
    id: number,
    name: string,
    email: string,
}

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: LocalStorage.getItem('auth-user') as UserModel | null,
        token: LocalStorage.getItem('auth-token') as string | null,
    }),
    getters: {
        getUser(): UserModel | null {
            return this.user
        },
        getToken(): string | null {
            return this.token
        },
        isAuthenticated(): boolean {
            return !!this.token
        },
    },
    actions: {
        async checkSession() {
            try {
                await api.get('/user')
            } catch (e) {
                this.clearUserSession()
            }
        },
        setUser(user: UserModel) {
            this.user = user
            LocalStorage.set('auth-user', user)
        },
        setToken(token: string) {
            this.token = token
            LocalStorage.set('auth-token', token)
        },
        clearUserSession() {
            this.user = null
            this.token = null
            LocalStorage.clear()
            this.router.push({ name: 'auth.login' })
        }
    },
})
