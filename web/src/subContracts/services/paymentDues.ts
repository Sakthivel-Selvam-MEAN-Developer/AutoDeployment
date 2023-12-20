import { axiosInstance, getData } from '../../wonderMove/services'

export const createPaymentDues = (data: any) =>
    axiosInstance.post('/payment-dues', data).then(getData)

export const getOnlyActiveDues = () => axiosInstance.get('/payment-dues').then(getData)

export const listTripWithActiveDues = (name: string) =>
    axiosInstance.get(`/payment-dues/${name}`).then(getData)
