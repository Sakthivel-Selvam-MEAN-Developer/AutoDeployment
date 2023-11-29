import { axiosInstance, getData } from '../../wonderMove/services/index.ts'

export const getAllTruck = () => axiosInstance.get('/truck').then(getData)

export const getTruckByTransporter = (transporterName: any) =>
    axiosInstance.get(`/transporter-truck/${transporterName}`).then(getData)
