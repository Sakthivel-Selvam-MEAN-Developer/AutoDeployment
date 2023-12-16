import { axiosInstance, getData } from '../../wonderMove/services'

export const createpricePoint = (data: any) =>
    axiosInstance.post('/price-point', data).then(getData)

export const getPricePoint = (loadingPointId: any, unloadingPointId: any) =>
    axiosInstance.get(`/price-point/${loadingPointId}/${unloadingPointId}`).then(getData)
