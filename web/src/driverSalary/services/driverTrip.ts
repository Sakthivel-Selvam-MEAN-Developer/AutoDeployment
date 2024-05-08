import { axiosInstance, getData } from '../../apiCalls'
interface driverTripProps {
    tripStartDate: number
    driverId: number
    tripId: number
    tripSalaryId: number
}

export const createDriverTrip = (data: driverTripProps) =>
    axiosInstance.post(`/drivertrip`, data).then(getData)

export const getDriverTripByDriverId = (id: number) =>
    axiosInstance.get(`/drivertrip`, { params: { driverId: id } }).then(getData)
