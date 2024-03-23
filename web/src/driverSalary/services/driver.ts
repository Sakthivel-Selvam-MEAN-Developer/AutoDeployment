import { axiosInstance, getData } from '../../apiCalls'
interface driverProps {
    dateofBirth: number
    licenseExpriryDate: number
}
export interface tokenProps {
    headers: {
        authorization: string
    }
}
export const createDriver = (data: driverProps) => axiosInstance.post(`/driver`, data).then(getData)

export const getAllDriver = () => axiosInstance.get(`/driver`).then(getData)
