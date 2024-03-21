import { axiosInstance, getData } from '../../apiCalls'

export const getStopsByVehicle = (number: string) =>
    axiosInstance.get(`/stops/${number}`).then(getData)

export const stopDuration = (from: number, to: number) =>
    axiosInstance.get(`/stops/duration?from=${from}&to=${to}`).then(getData)

export const updateStops = (id: number, data: object) => {
    return axiosInstance.post(`/stops/update/${id}`, data)
}

export const overrideStop = (gpsStopId: number, data: object) => {
    return axiosInstance.post(`/stops/override?gpsStopId=${gpsStopId}`, data)
}
export const pendingStopReason = () => axiosInstance.get('/stops/pending').then(getData)
