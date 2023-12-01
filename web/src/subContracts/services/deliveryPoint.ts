import { axiosInstance, getData } from '../../wonderMove/services'

export const getAllDeliveryPoint = () => axiosInstance.get('/delivery-point').then(getData)

export const getDeliveryPointByCompanyName = (companyName: any) =>
    axiosInstance.get(`/delivery-point/${companyName}`).then(getData)
