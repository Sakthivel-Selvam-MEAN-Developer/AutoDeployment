import { axiosInstance, getData } from '../../apiCalls'
interface driverTripProps {
    tripStartDate: number
    driverId: number
    tripId: number
    unloadingTripSalaryId: number
    dailyBetta: number
    primaryTripBetta: number
}

export const createDriverTrip = (data: driverTripProps) =>
    axiosInstance.post(`/drivertrip`, data).then(getData)

export const getDriverTripByDriverId = (id: number, month: number | undefined) =>
    axiosInstance.get(`/drivertrip`, { params: { driverId: id, month } }).then(getData)

interface updateProps {
    tripId: number | undefined
    driverAdvance: string
}
export const updateDriverAdvance = (data: updateProps) =>
    axiosInstance.put(`/drivertrip/updateDriverAdvance`, data).then(getData)
