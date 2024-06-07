import { axiosInstance, getData } from '../../apiCalls'

export const getTripByTransporterInvoice = async (invoiceNumber?: string) =>
    axiosInstance
        .get('/transporterinvoice', { params: { invoiceNumber } })
        .then(getData)
        .catch(() => alert('Error Getting data'))
interface invoiceProps {
    id: number
    invoice: string
}
export const updateTransporterInvoice = (invoice: invoiceProps) =>
    axiosInstance
        .put('/transporterinvoice', invoice)
        .then(getData)
        .catch(() => alert('Error Getting data'))
