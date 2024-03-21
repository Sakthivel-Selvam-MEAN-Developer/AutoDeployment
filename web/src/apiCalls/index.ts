import axios, { AxiosInstance, AxiosResponse } from 'axios'
import config from '../../config.ts'

const getAxios = (token: string) =>
    axios.create({
        baseURL: config.backendUrl,
        timeout: 2000,
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        }
    })

export let axiosInstance: AxiosInstance = getAxios('')

export const initAxios = (token: string) => {
    axiosInstance = getAxios(token)
}

export const getData = <T>(response: AxiosResponse<T>): T => response.data
