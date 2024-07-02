import { axiosInstance, getData } from '../../apiCalls'

export const getCompanyInvoice = () =>
    axiosInstance
        .get(`/invoice/viewInvoice`)
        .then(getData)
        .catch(() => alert('Error Getting data'))
