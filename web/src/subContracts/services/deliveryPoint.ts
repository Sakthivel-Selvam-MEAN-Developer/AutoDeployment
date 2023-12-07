import { axiosInstance, getData } from '../../wonderMove/services/index.ts'

export const createDeliveryPoint = (data: any) =>
    axiosInstance.post('/delivery-point', data).then(getData)

export const getAllDeliveryPoint = () => axiosInstance.get('/delivery-point').then(getData)

export const getDeliveryPointByCompanyName = (companyName: string) =>
    axiosInstance.get(`/delivery-point/${companyName}`).then(getData)
