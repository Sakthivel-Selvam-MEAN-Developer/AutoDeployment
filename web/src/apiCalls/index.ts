import axios, { AxiosInstance, AxiosResponse } from 'axios'
import config from '../../config.ts'

const getAxios = (token: string) =>
    axios.create({
        baseURL: config.backendUrl,
        timeout: 3000,
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
            hostname: `${window.location.protocol}//${window.location.hostname}`
        }
    })

export let axiosInstance: AxiosInstance = getAxios('')

export const initAxios = (token: string) => {
    axiosInstance = getAxios(token)
}
export const axiosGet = async (url: string, params: any) => {
    return axiosInstance
        .get(url, { params })
        .then(getData)
        .catch(() => alert('Error Getting data'))
}

export const getData = <T>(response: AxiosResponse<T>): T => response.data
