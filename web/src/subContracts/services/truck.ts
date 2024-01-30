import { axiosInstance, getData } from '../../wonderMove/services/index.ts'

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
export const createTruck = (data: dataProps) =>
    axiosInstance
        .post('/truck', data)
        .then(getData)
        .catch(() => alert('Error Getting data'))

export const getTruckByTransporter = (transporterName: string) =>
    axiosInstance
        .get(`/transporter-truck/${transporterName}`)
        .then(getData)
        .catch(() => alert('Error Getting data'))
