import axios from 'axios'
import { useAuthStore } from 'stores/auth-store'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: 'http://localhost:80/api/v1' })

api.interceptors.request.use(request => {
    const authStore = useAuthStore()
    request.headers.common.Authorization = 'Bearer ' + authStore.getToken

    return request
}, error => {
    return Promise.reject(error)
})

api.interceptors.response.use(response => {
    console.log('bbbb')

    return response
}, (error) => {
    const authStore = useAuthStore()
    if (!axios.isAxiosError(error)) {
        return Promise.reject(error)
    }
    console.log(error.response)
    if (error.response?.status === 401) {
        authStore.clearUserSession()
    }

    return Promise.reject(error)
})

export { api }
