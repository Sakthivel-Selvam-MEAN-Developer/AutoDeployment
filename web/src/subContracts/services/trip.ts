import { axiosInstance, getData } from '../../apiCalls'
interface dataProps {
    truckId: number
    loadingPointId: number | null
    unloadingPointId: number | null
    startDate: number
    filledLoad: number
    invoiceNumber: string
    freightAmount: number
    transporterAmount: number
    totalFreightAmount: number
    totalTransporterAmount: number
    margin: number
    wantFuel: boolean
}

export const getAllTrip = () =>
    axiosInstance
        .get(`/trip`)
        .then(getData)
        .catch(() => alert('Error Getting data'))

export const createTrip = (data: dataProps) =>
    axiosInstance
        .post(`/trip`, data)
        .then(getData)
        .catch((error) => console.log(error))
