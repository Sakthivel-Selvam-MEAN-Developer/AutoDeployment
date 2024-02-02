import { axiosInstance, getData } from '../../wonderMove/services'

export const getOverallTrip = () =>
    axiosInstance
        .get(`/overallTrip`)
        .then(getData)
        .catch(() => alert('Error Getting data'))

export const getOverallTripByCompany = (company: string) =>
    axiosInstance
        .get(`/overalltrip/${company}`)
        .then(getData)
        .catch(() => alert('Error Getting data'))

export const getOverallTripByFilter = (
    cementCompanyId: number,
    transporterId: number,
    loadingPointId: number,
    from: number,
    to: number
) =>
    axiosInstance
        .get(`/overallTrip/${cementCompanyId}/${transporterId}/${loadingPointId}/${from}/${to}`)
        .then(getData)
        .catch(() => alert('Error Getting data'))
