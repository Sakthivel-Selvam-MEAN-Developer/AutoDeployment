import { axiosInstance, getData } from '../../wonderMove/services/index.ts'

export const getAllTrip = () => axiosInstance.get(`/trip`).then(getData)

export const createTrip = (data: any) => axiosInstance.post(`/trip`, data).then(getData)
