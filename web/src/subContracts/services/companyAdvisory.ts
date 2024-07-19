import { axiosInstance, getData } from '../../apiCalls'

interface advisory {
    bankReferenceNumber: string
    paymentDocumentNumber: string
    invoiceDetails: {
        id: number
        paymentReceivedDate: number
        receivedAmount: number
    }[]
}

export const createCompanyAdvisory = (advisory: advisory) =>
    axiosInstance
        .post('/companyAdvisory/create', advisory)
        .then(getData)
        .catch(() => alert('Error Getting data'))
