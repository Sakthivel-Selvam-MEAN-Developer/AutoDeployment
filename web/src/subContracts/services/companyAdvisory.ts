import { axiosInstance, getData } from '../../apiCalls'

interface advisory {
    bankReferenceNumber: string
    paymentDocumentNumber: string
    paymentReceivedDate: number
}
export const createCompanyAdvisory = (advisory: advisory) =>
    axiosInstance
        .post('/companyAdvisory/create', advisory)
        .then(getData)
        .catch(() => alert('Error Getting data'))

export const getAllCompanyAdvisory = () =>
    axiosInstance
        .get('/companyAdvisory/get')
        .then(getData)
        .catch(() => alert('Error Getting data'))
