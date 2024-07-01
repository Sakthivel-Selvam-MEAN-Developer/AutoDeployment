import { axiosInstance, getData } from '../../apiCalls'
import { Nullable } from '../../types'
import { tripDetailsProps } from '../components/invoice/generateInvoice/list'

interface updateInvoiceProps {
    trip: tripDetailsProps[]
    bill: { billNo: string; date: number }
}
export const updateInvoiceDetails = (invoiceDetails: updateInvoiceProps) =>
    axiosInstance
        .put('/invoice/update', invoiceDetails)
        .then(getData)
        .catch(() => alert('Error Getting data'))
type tripTypeProps = {
    cementCompanyName: string
    startDate: number
    endDate: number
    pageName: string
}
export const getTripDetailsByFilterData = (filterData: Nullable<tripTypeProps>) =>
    axiosInstance
        .get('/invoice', { params: filterData })
        .then(getData)
        .catch(() => alert('Error Getting data'))
