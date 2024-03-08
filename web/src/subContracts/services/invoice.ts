import { axiosInstance, getData } from '../../wonderMove/services'
import { tripDetailsProps } from '../components/invoice/list'
import { tokenProps } from './acknowledgement.tsx'

export const getInvoiceDetails = (id: tripDetailsProps[], token: tokenProps | undefined) =>
    axiosInstance
        .put('/invoice/', id, token)
        .then(getData)
        .catch(() => alert('Error Getting data'))

interface updateInvoiceProps {
    trip: tripDetailsProps[]
    billNo: string
}
export const updateInvoiceDetails = (
    invoiceDetails: updateInvoiceProps,
    token: tokenProps | undefined
) =>
    axiosInstance
        .put('/invoice/update', invoiceDetails, token)
        .then(getData)
        .catch(() => alert('Error Getting data'))
