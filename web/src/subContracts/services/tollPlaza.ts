import { axiosGet, axiosInstance, getData } from '../../apiCalls'
import { dataProps, property } from '../components/tollPlaza/tollInvoice/type'
export const createTollPlazaLocation = (data: dataProps[]) =>
    axiosInstance
        .post(`/toll`, data)
        .then(getData)
        .catch(() => alert('Error Getting data'))
export const updateBillStatus = (overallTripId: number[], data: property) =>
    axiosInstance
        .put(`/toll`, { data, overallTripId })
        .then(getData)
        .catch(() => alert('Error Getting data'))
export const getTollDetails = () =>
    axiosInstance
        .get(`/toll`)
        .then(getData)
        .catch(() => alert('Error Getting data'))
export const getOverallTripWithTollDetailsNotEmpty = () => axiosGet('/toll/invoice', {})
export const updateTollLocation = () =>
    axiosInstance
        .put(`/toll/updatelocations`)
        .then(getData)
        .catch(() => alert('Error Getting data'))
export const deleteTollLocation = () =>
    axiosInstance
        .delete(`/toll/delete`)
        .then(getData)
        .catch(() => alert('Error Getting data'))
