import { axiosInstance, getData } from '../../wonderMove/services/index.ts'
interface dataProps {
    startDate: number | undefined
    invoiceNumber: string | undefined
    freightAmount: number | undefined
    transporterAmount: number | undefined
    unloadingPointId: number | undefined
    loadingPointToStockPointTripId: number | undefined
}
export const createStockTrip = (data: dataProps) =>
    axiosInstance
        .post(`/unloading-trip`, data)
        .then(getData)
        .catch(() => alert('Error Getting data'))
