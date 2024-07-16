import { axiosInstance, getData } from '../../apiCalls'
import { Nullable } from '../../types'
import { tripDetailsProps } from '../components/invoice/generateInvoice/list'
interface updateInvoiceProps {
    trip: tripDetailsProps
    bill: { billNo: string; date: number }
    cementCompany: { name: string | undefined; id: number | undefined }
}
export const updateInvoiceDetails = (invoiceDetails: updateInvoiceProps) =>
    axiosInstance
        .put('/invoice/update', invoiceDetails)
        .then(getData)
        .catch(() => alert('Error Getting data'))
export const previewInvoicePDF = (invoiceDetails: updateInvoiceProps) =>
    axiosInstance
        .post('/invoice/previewPDF', invoiceDetails)
        .then(getData)
        .catch(() => alert('Error Getting data'))
type tripTypeProps = {
    cementCompany: { name: string | undefined; id: number | undefined }
    startDate: number
    endDate: number
    pageName: string
}
export const getTripDetailsByFilterData = (filterData: Nullable<tripTypeProps>) =>
    axiosInstance
        .get('/invoice', { params: filterData })
        .then(getData)
        .catch(() => alert('Error Getting data'))
type updateProps = {
    billingRate: number | undefined
    pageName: string
    id: number
}
export const updateBillingRate = (updateDetails: updateProps) =>
    axiosInstance
        .put('/invoice/billingrate', updateDetails)
        .then(getData)
        .catch(() => alert('Error Getting data'))
