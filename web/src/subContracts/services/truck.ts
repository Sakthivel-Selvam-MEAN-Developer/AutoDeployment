import { axiosInstance, getData } from '../../wonderMove/services/index.ts'

export const getAllTruck = () => axiosInstance.get('/truck').then(getData)

export const getTruckByTransporter = (transporterName: string) =>
    axiosInstance.get(`/transporter-truck/${transporterName}`).then(getData)
