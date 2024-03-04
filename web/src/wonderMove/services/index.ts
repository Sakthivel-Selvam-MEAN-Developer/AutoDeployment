import axios, { AxiosInstance, AxiosResponse } from 'axios'
import config from '../../../config.js'

export const axiosInstance: AxiosInstance = axios.create({
    baseURL: config.backendUrl,
    timeout: 2000,
    headers: {
        'Content-Type': 'application/json'
    }
})

export const getData = <T>(response: AxiosResponse<T>): T => response.data
