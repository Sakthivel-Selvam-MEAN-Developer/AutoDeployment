import { axiosInstance, getData } from '../../apiCalls'
interface dataProps {
    startDate: number | undefined
    invoiceNumber: string
    freightAmount: number
    transporterAmount: number
    unloadingPointId: number | null
    loadingPointToStockPointTripId: number
}
export const createStockTrip = (data: dataProps, type: string, stockPointId: number) =>
    axiosInstance
        .post(`/unloading-trip`, data, { params: { stockPointId, type } })
        .then(getData)
        .catch((error) => alert(error.response.data))

export const getAllStockToUnloadingPointUnbilledTrips = () =>
    axiosInstance
        .get('/stock-to-unloading-unbilled-trips')
        .then(getData)
        .catch(() => alert('Error Getting data'))

export const getAllUnloadingPointUnbilledTrips = () =>
    axiosInstance
        .get('/unloading-point-unbilled-trips')
        .then(getData)
        .catch(() => alert('Error Getting data'))
