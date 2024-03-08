import { axiosInstance, getData } from '../../wonderMove/services'
import { tokenProps } from './acknowledgement.tsx'

interface dataProps {
    loadingPointId: number | null
    unloadingPointId: number | null
    stockPointId: number | null
    freightAmount: number
    transporterPercentage: number
    transporterAmount: number
}
export const createpricePoint = (data: dataProps, token: tokenProps | undefined) =>
    axiosInstance
        .post('/price-point', data, token)
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
