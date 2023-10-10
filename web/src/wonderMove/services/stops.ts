import { axiosInstance, getData } from './index.js'

export const getStopsByVehicle = (number: string) =>
    axiosInstance.get(`/stops/${number}`).then(getData)

export const stopDuration = (from: number, to: number) =>
    axiosInstance.get(`/stops/duration?from=${from}&to=${to}`).then(getData)

export const updateStops = (id: number, data: object) => {
    return axiosInstance.post(`/stops/update/${id}`, data)
}

export const updateSecondReason = (id: number, data: object) => {
    return axiosInstance.post(`/stops/update/2/${id}`, data)
}
export const pendingStopReason = (reason: object) =>
    axiosInstance.get('/stops/pending', reason).then(getData)
