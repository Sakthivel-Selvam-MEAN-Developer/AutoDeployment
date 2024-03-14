import { axiosInstance, getData } from '../../wonderMove/services'
interface driverProps {
    dateofBirth: number
    licenseExpriryDate: number
}
export interface tokenProps {
    headers: {
        authorization: string
    }
}
export const createDriver = (data: driverProps, token: tokenProps | undefined) =>
    axiosInstance.post(`/driver`, data, token).then(getData)
