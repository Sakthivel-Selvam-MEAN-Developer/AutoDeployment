import { axiosInstance, getData } from '../../wonderMove/services'
import { tripDetailsProps } from '../components/invoice/list'

export const getInvoiceDetails = (id: number[]) =>
    axiosInstance
        .put('/invoice/', id)
        .then(getData)
        .catch(() => alert('Error Getting data'))

interface updateInvoiceProps {
    trip: tripDetailsProps[]
    billNo: string
}
export const updateInvoiceDetails = (invoiceDetails: updateInvoiceProps) =>
    axiosInstance
        .put('/invoice/update', invoiceDetails)
        .then(getData)
        .catch(() => alert('Error Getting data'))
