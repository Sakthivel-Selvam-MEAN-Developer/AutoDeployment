import { axiosInstance, getData } from '../../apiCalls'
interface dataProps {
    tollPlazaLocation: string
    amount: number
    overallTripId: number
}
interface props {
    billNo: string
    billDate: number
}
export const createTollPlazaLocation = (data: dataProps[]) =>
    axiosInstance
        .post(`/toll`, data)
        .then(getData)
        .catch(() => alert('Error Getting data'))
export const updateBillStatus = (overallTripId: number[], data: props) =>
    axiosInstance
        .put(`/toll`, { data, overallTripId })
        .then(getData)
        .catch(() => alert('Error Getting data'))
export const getTollDetails = () =>
    axiosInstance
        .get(`/toll`)
        .then(getData)
        .catch(() => alert('Error Getting data'))
export const getOverallTripWithTollDetailsNotEmpty = () =>
    axiosInstance
        .get(`/toll/invoice`)
        .then(getData)
        .catch(() => alert('Error Getting data'))
