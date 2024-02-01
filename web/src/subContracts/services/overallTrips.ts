import { axiosInstance, getData } from '../../wonderMove/services'

export const getOverallTrip = () =>
    axiosInstance
        .get(`/overallTrip`)
        .then(getData)
        .catch(() => alert('Error Getting data'))

export const getOverallTripByFilter = (
    cementCompanyId: number,
    transporterId: number,
    loadingPointId: number
) =>
    axiosInstance
        .get(`/overallTrip/${cementCompanyId}/${transporterId}/${loadingPointId}`)
        .then(getData)
        .catch(() => alert('Error Getting data'))
