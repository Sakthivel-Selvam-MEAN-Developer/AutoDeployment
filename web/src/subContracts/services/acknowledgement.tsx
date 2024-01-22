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
        .put(`/acknowledgement/${id}`)
        .then(getData)
        .catch(() => alert('Error Updating data'))
interface dataProps {
    id: number
}
export const closeTrip = (tripDetails: dataProps) =>
    axiosInstance
        .put(`/acknowledgement/trip`, tripDetails)
        .then(getData)
        .catch(() => alert('Error Getting data'))
