import { axiosGet, axiosInstance, getData } from '../../apiCalls'
import { TripFilters } from '../types/tripFilters'

export const getOverallTrip = () =>
    axiosInstance
        .get(`/overallTrip`)
        .then(getData)
        .catch(() => alert('Error Getting data'))

export const getTripByUnloadDate = (date: number) =>
    axiosInstance
        .get(`/overalltrip/acknowledgement/${date}`)
        .then(getData)
        .catch(() => alert('Error Getting data'))

export const getAllDiscrepancyReport = (from: number, to: number) =>
    axiosInstance
        .get(`/overalltrip/report/discrepancy/${from}/${to}`)
        .then(getData)
        .catch(() => alert('Error Getting data'))

export const tripStatusFilter = (tripFilters: TripFilters) =>
    axiosGet('/overallTrip/tripstatusreport', { ...tripFilters })
