import { axiosInstance, getData } from '../../wonderMove/services/index.ts'
interface dataProps {
    startDate: number
    invoiceNumber: string
    freightAmount: number
    transporterAmount: number
    unloadingPointId: number | null
    loadingPointToStockPointTripId: number
}
export const createStockTrip = (data: dataProps) =>
    axiosInstance
        .post(`/unloading-trip`, data)
        .then(getData)
        .catch(() => alert('Error Getting data'))
