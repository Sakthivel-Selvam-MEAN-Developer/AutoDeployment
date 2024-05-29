import { axiosInstance, getData } from '../../apiCalls'

export const getTripsForPricePointApproval = () =>
    axiosInstance
        .get('/pricepointapproval')
        .then(getData)
        .catch(() => alert('Error Getting data'))
