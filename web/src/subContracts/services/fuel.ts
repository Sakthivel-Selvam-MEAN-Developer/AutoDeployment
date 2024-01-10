import { axiosInstance, getData } from '../../wonderMove/services'

interface fuelProps {
    vehicleNumber: string
    pricePerliter: number
    quantity: number
    totalprice: number
    fuelStationId: number
}
export const createFuel = (data: fuelProps, bunkname: string) =>
    axiosInstance
        .post(`/fuel/${bunkname}`, data)
        .then(getData)
        .catch(() => alert('Please provide valid details'))

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
