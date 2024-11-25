import type { App } from "vue"
import axios, { type AxiosResponse } from "axios"
import { API_URL } from "./constants"
import router from "./router"

export const httpClient = axios.create({
    baseURL: API_URL,
    timeout: 5000,
    // baseURL: process.env.APP_API_BASE_URL,
})

export function setupHttp(app: App) {
    
    httpClient.interceptors.request.use(function (config) {
        const token = localStorage.getItem('at') // access token
        config.headers.Authorization = token ? `Bearer ${token}` : ''
        return config
    })
    
    httpClient.interceptors.response.use(
        (response: AxiosResponse) => {
            // if (!response.data) {
            //     throw new Error("ERR_RESPONSE_EMPTY")
            // }
            return response
        },
        (error: any) => {
            if (error.response.status === 401) {
                router.replace({ name: 'login' })
    
                localStorage.removeItem('at') // access token
                localStorage.removeItem('un') // username
            }
            throw error
        },
    )
}