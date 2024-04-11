import { axiosInstance, getData } from '../../apiCalls'

interface dataProps {
    loadingPointId: number | null
    unloadingPointId: number | null
    stockPointId: number | null
    freightAmount: number
    transporterPercentage: number
    transporterAmount: number
}
export const createpricePoint = (data: dataProps) =>
    axiosInstance
        .post('/price-point', data)
        .then(getData)
        .catch((e) => alert(e))

export const getAllpricePoint = () =>
    axiosInstance
        .get('/price-point')
        .then(getData)
        .catch((e) => alert(e))
export const getPricePoint = (
    loadingPointId: number | null,
    unloadingPointId: number | null,
    stockPointId: number | null
) =>
    axiosInstance
        .get(`/price-point/${loadingPointId}/${unloadingPointId}/${stockPointId}`)
        .then(getData)
        .catch(() => alert('Error Getting data'))
