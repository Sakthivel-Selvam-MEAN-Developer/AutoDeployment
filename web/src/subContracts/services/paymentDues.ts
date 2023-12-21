import { axiosInstance, getData } from '../../wonderMove/services'

export const createPaymentDues = (data: any) =>
    axiosInstance.post('/payment-dues', data).then(getData)

export const getOnlyActiveDues = (todayDate: number) =>
    axiosInstance.get(`/payment-dues/${todayDate}`).then(getData)

export const updatePaymentDues = (data: object) =>
    axiosInstance.put('/payment-dues', data).then(getData)
