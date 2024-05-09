import { axiosInstance, getData } from '../../apiCalls'

export const getTripByTransporterInvoice = () =>
    axiosInstance
        .get('/transporterinvoice')
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
