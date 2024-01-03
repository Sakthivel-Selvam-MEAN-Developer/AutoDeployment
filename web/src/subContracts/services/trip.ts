import { axiosInstance, getData } from '../../wonderMove/services/index.ts'

export const getAllTrip = () =>
    axiosInstance
        .get(`/trip`)
        .then(getData)
        .catch(() => alert('Error Getting data'))

export const getTripByTruckNumber = (data: any) =>
    axiosInstance
        .get(`/trip/${data}`)
        .then(getData)
        .catch(() => alert('Error Getting data'))

export const createTrip = (data: any) =>
    axiosInstance
        .post(`/trip`, data)
        .then(getData)
        .catch((e) => console.log(e))

export const updateBalance = (data: any) =>
    axiosInstance
        .put(`/trip`, data)
        .then(getData)
        .catch(() => alert('Error Updating data'))
