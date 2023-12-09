import { axiosInstance, getData } from '../../wonderMove/services'

export const createpricePoint = (data: any) =>
    axiosInstance.post('/price-point', data).then(getData)

export const getPricePoint = (factoryId: any, deliveryPointId: any) =>
    axiosInstance.get(`/price-point/${factoryId}/${deliveryPointId}`).then(getData)
