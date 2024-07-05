import { axiosInstance, getData } from '../../apiCalls'
import { Nullable } from '../../types'
type tripTypeProps = {
    cementCompany: { name: string | undefined; id: number | undefined }
    startDate: number
    endDate: number
    pageName: string
}
export const getCompanyInvoice = (filterData: Nullable<tripTypeProps>) =>
    axiosInstance
        .get('/invoice/viewInvoice', { params: filterData })
        .then(getData)
        .catch(() => alert('Error Getting data'))
