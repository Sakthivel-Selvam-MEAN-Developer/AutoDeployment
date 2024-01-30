import { axiosInstance, getData } from '../../wonderMove/services'

export const getAllActiveTripsByAcknowledgement = () =>
    axiosInstance
        .get(`/acknowledgement`)
        .then(getData)
        .catch(() => alert('Error Getting data'))

export const getTripById = (id: number) =>
    axiosInstance
        .get(`/acknowledgement/${id}`)
        .then(getData)
        .catch(() => alert('Error Getting data'))

export const updateAcknowledgementStatus = (id: number) =>
    axiosInstance
        .put(`/acknowledge/${id}`)
        .then(getData)
        .catch(() => alert('Error Updating data'))

interface dataProps {
    overallTripId: number
    shortageQuantity: number
    shortageAmount: number
    approvalStatus: boolean | null
    reason: string | null
    filledLoad: number
    unloadedQuantity: number | null
}
export const closeTrip = (tripDetails: dataProps) =>
    axiosInstance
        .put(`/acknowledgement/trip`, tripDetails)
        .then(getData)
        .catch(() => alert('Error Getting data'))
