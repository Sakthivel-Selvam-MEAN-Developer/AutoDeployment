import { axiosInstance, getData } from '../../wonderMove/services/index.ts'

export const getAllTrip = () => axiosInstance.get(`/trip`).then(getData)

export const getTripByTruckNumber = (data: any) => axiosInstance.get(`/trip/${data}`).then(getData)

export const getByActiveTrip = () => axiosInstance.get('/trip/active').then(getData)

export const createTrip = (data: any) => axiosInstance.post(`/trip`, data).then(getData)

export const updateBalance = (data: any) => axiosInstance.put(`/trip`, data).then(getData)
