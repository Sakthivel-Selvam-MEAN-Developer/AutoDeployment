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
