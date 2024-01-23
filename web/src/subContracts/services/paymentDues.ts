import { axiosInstance, getData } from '../../wonderMove/services'

export const getOnlyActiveDues = (todayDate: number) =>
    axiosInstance
        .get(`/payment-dues/${todayDate}`)
        .then(getData)
        .catch(() => alert('Error Getting data'))

export const updatePaymentDues = (data: object) =>
    axiosInstance
        .put('/payment-dues', data)
        .then(getData)
        .catch(() => alert('Error Updating data'))
