import { axiosInstance, getData } from './index.js'

export const getStopsByVehicle = (number: string) =>
    axiosInstance.get(`/stops/${number}`).then(getData)

export const stopDuration = (from: number, to: number) =>
    axiosInstance.get(`/stops/duration?from=${from}&to=${to}`).then(getData)

export const updateStops = (id: number, data: object) => {
    return axiosInstance.post(`/stops/update/${id}`, data)
}

export const overrideStop = (id: number, data: any) => {
    return axiosInstance.post(`/stops/override/${id}`, data)
}
export const pendingStopReason = (reason: object) =>
    axiosInstance.get('/stops/pending', reason).then(getData)
