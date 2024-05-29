import { axiosInstance, getData } from '../../apiCalls'
import { Nullable } from '../../types'

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
export const getOnlyActiveDues = (todayDate: Nullable<number>, status: boolean, type: string) =>
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

export const getUpcomingDuesByFilter = (filterData: object) =>
    axiosInstance
        .get(`/upcoming-payment-dues/`, { params: filterData })
        .then(getData)
        .catch(() => alert('Error Getting data'))

export const getCompletedDues = (
    name: string,
    from: number,
    to: number,
    page: number,
    payType: string
) =>
    axiosInstance
        .get('/completed-payment-dues', { params: { name, from, to, page, payType } })
        .then(getData)
        .catch(() => alert('Error Getting data'))
