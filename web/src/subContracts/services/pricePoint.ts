import { axiosInstance, getData } from '../../wonderMove/services'
interface dataProps {
    loadingPointId: number
    unloadingPointId: number
    freightAmount: number
    transporterPercentage: number
    transporterAmount: number
}
export const createpricePoint = (data: dataProps) =>
    axiosInstance
        .post('/price-point', data)
        .then(getData)
        .catch(() => alert('Please provide valid details'))

export const getPricePoint = (loadingPointId: any, unloadingPointId: any) =>
    axiosInstance.get(`/price-point/${loadingPointId}/${unloadingPointId}`).then(getData)
