import { axiosInstance, getData } from '../../apiCalls'
import { Nullable, tripTypeProps, updateInvoiceProps, updateProps } from '../../types'

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

export const getTripDetailsByFilterData = (filterData: Nullable<tripTypeProps>) =>
    axiosInstance
        .get('/invoice', { params: filterData })
        .then(getData)
        .catch(() => alert('Error Getting data'))
export const updateBillingRate = (updateDetails: updateProps) =>
    axiosInstance
        .put('/invoice/billingrate', updateDetails)
        .then(getData)
        .catch(() => alert('Error Getting data'))
