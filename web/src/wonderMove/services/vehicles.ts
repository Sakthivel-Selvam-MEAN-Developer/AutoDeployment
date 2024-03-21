import { axiosInstance, getData } from '../../apiCalls'

export const updateVehicle = (number: string, vehicle: string) => {
    return axiosInstance.post(`/vehicles/${number}`, vehicle)
}

export const createVehicle = (vehicle: string) => axiosInstance.post('/vehicles', vehicle)
export const getVehicles = () => axiosInstance.get('/vehicles').then(getData)
export const getVehicleDetails = (number: string) =>
    axiosInstance.get(`/vehicles/${number}`).then(getData)
