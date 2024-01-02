import { axiosInstance, getData } from '../../wonderMove/services'

export const getOnlyActiveDues = (todayDate: number, type: string) =>
    axiosInstance.get(`/payment-dues/${todayDate}/${type}`).then(getData)

export const updatePaymentDues = (data: object) =>
    axiosInstance.put('/payment-dues', data).then(getData)
