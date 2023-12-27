import { axiosInstance, getData } from '../../wonderMove/services'

interface fuelProps {
    loadingPointToUnloadingPointTripId: number
    pricePerliter: number
    quantity: number
    totalprice: number
    fuelStationId: number
}
export const createFuel = (data: fuelProps) => axiosInstance.post('/fuel', data).then(getData)

export const getAllFuel = () => axiosInstance.get(`/fuel`).then(getData)
