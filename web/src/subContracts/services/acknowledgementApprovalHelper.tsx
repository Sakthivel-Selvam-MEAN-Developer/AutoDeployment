import { axiosInstance, getData } from '../../apiCalls'

export const getCompanyNameByOverallTripId = (id: number) =>
    axiosInstance
        .get('/getCompanyNameByOverallTripId', { params: { id } })
        .then(getData)
        .catch(() => alert('Error Getting data'))
