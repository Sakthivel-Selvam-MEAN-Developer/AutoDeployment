import { axiosInstance, getData } from './index.js'

export const getAllReasons = (reason: any) =>
    axiosInstance.get('/stop-reason', reason).then(getData)

export const allPendingSRforSingleVehicle = (number: string) =>
    axiosInstance.get(`/stops-pending/${number}`).then(getData)
