import { axiosInstance, getData } from '../../wonderMove/services'
interface dataProps {
    name: string
    type: string
    dueDate: number
    payableAmount: number
    tripId: number
}
export const createPaymentDues = (data: dataProps) =>
    axiosInstance
        .post('/payment-dues', data)
        .then(getData)
        .catch(() => alert('Please provide valid details'))

export const getOnlyActiveDues = (todayDate: number, type: string) =>
    axiosInstance.get(`/payment-dues/${todayDate}/${type}`).then(getData)

export const updatePaymentDues = (data: object) =>
    axiosInstance.put('/payment-dues', data).then(getData)
