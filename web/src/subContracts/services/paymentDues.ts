import { axiosInstance, getData } from '../../wonderMove/services'

export const getOnlyActiveDues = (todayDate: number, status: boolean) =>
    axiosInstance
        .get(`/payment-dues/${todayDate}/${status}`)
        .then(getData)
        .catch(() => alert('Error Getting data'))

export const updatePaymentDues = (data: object) =>
    axiosInstance
        .put('/payment-dues', data)
        .then(getData)
        .catch(() => alert('Error Updating data'))

export const updateNEFTStatus = (dueId: number[]) =>
    axiosInstance
        .put('/payment-dues/NEFT', dueId)
        .then(getData)
        .catch(() => alert('Error Updating data'))

export const getGstDues = () =>
    axiosInstance
        .get('/payment-dues/gst')
        .then(getData)
        .catch(() => alert('Error Getting data'))

export const getUpcomingDuesByFilter = (name: string, from: number, to: number) =>
    axiosInstance
        .get(`/payment-dues/${name}/${from}/${to}`)
        .then(getData)
        .catch(() => alert('Error Getting data'))
