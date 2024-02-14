import { axiosInstance, getData } from '../../wonderMove/services'

export const getOverallTrip = () =>
    axiosInstance
        .get(`/overallTrip`)
        .then(getData)
        .catch(() => alert('Error Getting data'))

export const getOverallTripByCompany = (company: string | null, loadingDate: number) =>
    axiosInstance
        .get(`/overalltrip/${company}/${loadingDate}`)
        .then(getData)
        .catch(() => alert('Error Getting data'))

export const getTripByUnloadDate = (date: number) =>
    axiosInstance
        .get(`/overalltrip/acknowledgement/${date}`)
        .then(getData)
        .catch(() => alert('Error Getting data'))

export const getAllDiscrepancyReport = (from: number, to: number) =>
    axiosInstance
        .get(`/overalltrip/report/${from}/${to}`)
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
