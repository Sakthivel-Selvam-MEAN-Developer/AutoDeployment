import { axiosInstance, getData } from './index.js'

export const updateVehicle = (number: number, vehicle: object) => {
    return axiosInstance.post(`/vehicles/${number}`, vehicle)
}

export const createVehicle = (vehicle: string) =>
    axiosInstance.post('/vehicles', vehicle)
export const getVehicles = () =>
    axiosInstance.get('/vehicles').then(getData)
export const getVehicleDetails = (number: number) =>
    axiosInstance.get(`/vehicles/${number}`).then(getData)
