import { axiosInstance, getData } from '../../apiCalls'
export const getAllActivetripTripByTripStatus = () =>
    axiosInstance
        .get(`/acknowledgement/tripstatus`)
        .then(getData)
        .catch(() => alert('Error Getting data'))
export const getAllTripByAcknowledgementStatus = () =>
    axiosInstance
        .get(`/acknowledgement/acknowlegementstatus`)
        .then(getData)
        .catch(() => alert('Error Getting data'))

export const getTripById = (id: number) =>
    axiosInstance
        .get(`/acknowledgement/${id}`)
        .then(getData)
        .catch(() => alert('Error Getting data'))

export const updateAcknowledgementStatus = (id: number) =>
    axiosInstance
        .put(`/acknowledge/${id}`, { hi: 'hi' })
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

export const getNumberByTruckId = (id: number) =>
    axiosInstance
        .get(`/truck/transpotertype/${id}`)
        .then(getData)
        .catch(() => alert('Error Getting data'))
export const uploadAcknowledgementFile = (formData: FormData) =>
    axiosInstance
        .post('/acknowledgement/uploadAcknowledgementFile', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then(getData)
        .catch(() => alert('Error Getting data'))
