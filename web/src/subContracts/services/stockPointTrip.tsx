import { axiosInstance, getData } from '../../wonderMove/services/index.ts'

interface dataProps {
    truckId: number
    loadingPointId: number
    startDate: number
    filledLoad: number
    invoiceNumber: string
    freightAmount: number
    transporterAmount: number
    totalFreightAmount: number
    totalTransporterAmount: number
    margin: number
    wantFuel: boolean
    stockPointId: number
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
