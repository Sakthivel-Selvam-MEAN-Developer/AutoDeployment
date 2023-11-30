import { axiosInstance, getData } from '../../wonderMove/services/index.ts'

export const getAllTrip = () => axiosInstance.get(`/trip`).then(getData)

export const postTrip = () => axiosInstance.post(`/trip`).then(getData)
