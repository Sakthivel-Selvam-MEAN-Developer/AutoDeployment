import { axiosGet, axiosInstance, getData } from '../../apiCalls'
import { dataProps, billDetails, data } from '../components/tollPlaza/tollInvoice/type'

export const createTollPlazaLocation = (data: dataProps[]) =>
    axiosInstance
        .post(`/toll`, data)
        .then(getData)
        .catch(() => alert('Error Getting data'))
export const updateBillDetails = (tollIds: number[], data: billDetails) =>
    axiosInstance
        .put(`/toll/update/billDetails`, { data, tollIds })
        .then(getData)
        .catch(() => alert('Error Getting data'))
export const getTollDetails = () =>
    axiosInstance
        .get(`/toll`)
        .then(getData)
        .catch(() => alert('Error Getting data'))
export const getOverallTripWithTollDetailsNotEmpty = () => axiosGet('/toll/invoice', {})
export const updateTollAmount = (ids: number[], data: data) =>
    axiosInstance
        .put(`/toll/updatelocations`, { data, ids })
        .then(getData)
        .catch(() => alert('Error Getting data'))
