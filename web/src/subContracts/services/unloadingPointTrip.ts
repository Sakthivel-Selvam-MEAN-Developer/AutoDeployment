import { axiosInstance, getData } from '../../apiCalls'
interface dataProps {
    startDate: number | undefined
    invoiceNumber: string
    freightAmount: number
    transporterAmount: number
    unloadingPointId: number | null
    loadingPointToStockPointTripId: number
}
export const createStockTrip = (data: dataProps, type: string) =>
    axiosInstance
        .post(`/unloading-trip/${type}`, data)
        .then(getData)
        .catch(() => alert('Error Getting data'))
