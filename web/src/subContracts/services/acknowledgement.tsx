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
