import { axiosInstance, getData } from '../../wonderMove/services'

export const getInvoiceDetails = (id: number[]) =>
    axiosInstance
        .put('/invoice/', id)
        .then(getData)
        .catch(() => alert('Error Getting data'))
