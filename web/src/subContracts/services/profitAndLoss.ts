import { axiosInstance, getData } from '../../apiCalls'

export const getOverallTripByVehicleNumber = (vehicleNumber: string) =>
    axiosInstance
        .get(`/profit-and-loss`, { params: { vehicleNumber } })
        .then(getData)
        .catch(() => alert('Error Getting data'))
