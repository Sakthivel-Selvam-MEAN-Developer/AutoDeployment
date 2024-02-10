import { axiosInstance, getData } from './index.ts'

export const create = (reason: string) => axiosInstance.post('/reason', reason).then(getData)
export const update = (reason: string) => axiosInstance.post('/reason-update', reason).then(getData)
export const getAllReasons = () => axiosInstance.get('/stop-reason').then(getData)

export const allPendingSRforSingleVehicle = (number: string) =>
    axiosInstance.get(`/stops-pending/${number}`).then(getData)
