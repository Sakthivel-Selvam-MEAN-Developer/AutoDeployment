import { axiosInstance, getData } from '../../apiCalls'
import { Nullable, type } from '../../types'
type tripTypeProps = {
    cementCompany: { name: string | undefined; id: number | undefined }
    startDate: number
    endDate: number
    pageNumber: number
}
export const getCompanyInvoice = (filterData: Nullable<tripTypeProps>) =>
    axiosInstance
        .get('/invoice/viewInvoice', { params: filterData })
        .then(getData)
        .catch(() => alert('Error Getting data'))

export const getInvoiceToAddAdvisory = (filterData: Nullable<tripTypeProps>) =>
    axiosInstance
        .get('/invoice/advisory/add', { params: filterData })
        .then(getData)
        .catch(() => alert('Error Getting data'))
export const updateShortageDetails = (shortageDetails: type) =>
    axiosInstance
        .put('/invoice/shortage/update', shortageDetails)
        .then(getData)
        .catch((err) => console.log(err))
