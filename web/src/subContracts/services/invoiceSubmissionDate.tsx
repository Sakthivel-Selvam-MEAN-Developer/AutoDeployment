import { axiosInstance, getData } from '../../apiCalls'

export const getBillsWithNoSubmissionDate = () =>
    axiosInstance
        .get(`/submissiondate`)
        .then(getData)
        .catch(() => alert('Error Getting data'))
interface dataTypes {
    id: number
    submitDate: number
}
export const updateSubmittedDateForInvoice = (data: dataTypes) =>
    axiosInstance
        .put(`/submissiondate`, data)
        .then(getData)
        .catch(() => alert('Error Getting data'))
