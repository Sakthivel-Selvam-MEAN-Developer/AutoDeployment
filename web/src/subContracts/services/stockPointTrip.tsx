import { axiosInstance, getData } from '../../apiCalls'

interface dataProps {
    truckId: number
    loadingPointId: number | null
    startDate: number
    filledLoad: number | null
    invoiceNumber: string
    freightAmount: number
    transporterAmount: number
    wantFuel: boolean
    stockPointId: number | null
    partyName: string | undefined
    lrNumber: string | undefined
}

export const createStockPointTrip = (data: dataProps) =>
    axiosInstance
        .post(`/stock-trip`, data)
        .then(getData)
        .catch((e) => alert(e))

export const getAllStockPointTrip = () =>
    axiosInstance
        .get(`/stock-trip`)
        .then(getData)
        .catch(() => alert('Error Getting data'))
