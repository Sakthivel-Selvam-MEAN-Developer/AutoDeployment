import { axiosInstance, getData } from '../../apiCalls'

interface dataProps {
    type: string
    bankDetails: bankDetailsProps[]
    payableAmount: number
}
interface bankDetailsProps {
    ifsc: string
    accountTypeNumber: number
    accountNumber: number | string
    accountHolder: string
    bunkName: string
    name: string
    branchName: string
}
export const getOnlyActiveDues = (todayDate: number, status: boolean, type: string) =>
    axiosInstance
        .get(`/payment-dues`, { params: { todayDate, status, type } })
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

export const donwloadNEFTFile = (dueDetails: dataProps[]) =>
    axiosInstance
        .put('/payment-dues/donwloadNEFTFile', dueDetails)
        .then(getData)
        .catch(() => alert('Error Updating data'))

export const getGstDues = (status: boolean) =>
    axiosInstance
        .get(`/payment-dues/${status}`)
        .then(getData)
        .catch(() => alert('Error Getting data'))

export const getUpcomingDuesByFilter = (name: string, from: number, to: number) =>
    axiosInstance
        .get(`/payment-dues/${name}/${from}/${to}`)
        .then(getData)
        .catch(() => alert('Error Getting data'))

export const getUpcomingDuesByFilterByDefault = () =>
    axiosInstance
        .get(`/upcoming-payment-dues/default`)
        .then(getData)
        .catch(() => alert('Error Getting data'))

export const getCompletedDues = (name: string, date: number, to: number, page: number) =>
    axiosInstance
        .get(`/completed-payment-dues/${name}/${date}/${to}/${page}`)
        .then(getData)
        .catch(() => alert('Error Getting data'))
