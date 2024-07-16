import { axiosInstance, getData } from '../../apiCalls'
import { fuelFilters } from '../types/fuelFilters'

interface fuelProps {
    vehicleNumber: string
    pricePerliter: number
    quantity: number
    totalprice: number
    bunkId: number
}
export const createFuel = (data: fuelProps, bunkname: string, creaditDays: number) =>
    axiosInstance.post(`/fuel/${bunkname}`, { data, creaditDays }).then(getData)

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
export const getAllFuelReport = (fuelFilters: fuelFilters) =>
    axiosInstance
        .get('/getAllFuelReport', { params: fuelFilters })
        .then(getData)
        .catch(() => alert('Error Getting data'))
