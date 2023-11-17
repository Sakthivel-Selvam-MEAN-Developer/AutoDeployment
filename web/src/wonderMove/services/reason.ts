import { axiosInstance, getData } from './index.ts'

export const create = (reason: any) => axiosInstance.post('/reason', reason).then(getData)
export const update = (reason: any) => axiosInstance.post('/reason-update', reason).then(getData)
export const getAllReasons = (reason: any) =>
    axiosInstance.get('/stop-reason', reason).then(getData)

export const allPendingSRforSingleVehicle = (number: string) =>
    axiosInstance.get(`/stops-pending/${number}`).then(getData)
