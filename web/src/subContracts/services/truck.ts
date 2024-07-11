import { axiosInstance, getData } from '../../apiCalls'

export const getAllTruck = () =>
    axiosInstance
        .get('/truck')
        .then(getData)
        .catch(() => alert('Error Getting data'))
interface dataProps {
    vehicleNumber: string
    capacity: number
    transporterId: number
}
export const createTruck = (data: dataProps) => axiosInstance.post('/truck', data).then(getData)

export const getTruckByTransporter = (transporterName: string) =>
    axiosInstance
        .get(`/transporter-truck/${transporterName}`)
        .then(getData)
        .catch(() => alert('Error Getting data'))
export const getNumberByTruckId = (id: number) =>
    axiosInstance
        .get(`/truck/transpotertype/${id}`)
        .then(getData)
        .catch(() => alert('Error Getting data'))
export const updateTransporterId = (truckId: number, transporterId: number) =>
    axiosInstance
        .put(`/truck/updateTranspoter`, { transporterId, truckId })
        .then(getData)
        .catch((e) => alert(e.response.data))
