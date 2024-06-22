import { axiosInstance, getData } from '../../apiCalls'

interface fuelProps {
    vehicleNumber: string
    pricePerliter: number
    quantity: number
    totalprice: number
    bunkId: number
}
export const createFuel = (data: fuelProps, bunkname: string) =>
    axiosInstance.post(`/fuel/${bunkname}`, data).then(getData)

export const getAllFuel = () =>
    axiosInstance
        .get(`/fuel`)
        .then(getData)
        .catch(() => alert('Error Getting data'))

export const listFuelWithoutTripId = (vehiclenumber: string) =>
    axiosInstance
        .get(`/fuel/${vehiclenumber}`)
        .then(getData)
        .catch(() => alert('Error Getting data'))
export const getAllFuelReport = () =>
    axiosInstance
        .get(`/getAllFuelReport`)
        .then(getData)
        .catch(() => alert('Error Getting data'))
