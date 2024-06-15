import { axiosInstance, getData } from '../../apiCalls'

export const getTripsForPricePointApproval = () =>
    axiosInstance
        .get('/pricepointapproval')
        .then(getData)
        .catch(() => alert('Error Getting data'))
interface dataProps {
    id: number
    freight: number
}
export const updateFreightinTrip = (data: dataProps) =>
    axiosInstance
        .put('/pricepointapproval', data)
        .then(getData)
        .catch(() => alert('Error Getting data'))
