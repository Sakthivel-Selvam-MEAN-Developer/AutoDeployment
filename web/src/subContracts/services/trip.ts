import { axiosInstance, getData } from '../../apiCalls'
interface dataProps {
    truckId: number
    loadingPointId: number | null
    unloadingPointId: number | null
    startDate: number
    filledLoad: number | null
    invoiceNumber: string
    wantFuel: boolean
    partyName: string
    lrNumber: string
    vehicleNumber: string
}

export const getAllTrip = () =>
    axiosInstance
        .get(`/trip`)
        .then(getData)
        .catch(() => alert('Error Getting data'))

export const createTrip = (data: dataProps) => axiosInstance.post(`/trip`, data).then(getData)
