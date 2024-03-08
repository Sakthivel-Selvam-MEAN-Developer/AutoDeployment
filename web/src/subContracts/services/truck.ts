import { axiosInstance, getData } from '../../wonderMove/services/index.ts'
import { tokenProps } from './acknowledgement.tsx'

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
export const createTruck = (data: dataProps, token: tokenProps | undefined) =>
    axiosInstance.post('/truck', data, token).then(getData)

export const getTruckByTransporter = (transporterName: string) =>
    axiosInstance
        .get(`/transporter-truck/${transporterName}`)
        .then(getData)
        .catch(() => alert('Error Getting data'))
