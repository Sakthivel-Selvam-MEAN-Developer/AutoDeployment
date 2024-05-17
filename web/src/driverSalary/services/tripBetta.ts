import { axiosInstance, getData } from '../../apiCalls'
export interface tokenProps {
    headers: {
        authorization: string
    }
}
interface tripSalaryProps {
    cementCompanyId: number
    loadingPointId: number | null
    unloadingPointId: number | null
    stockPointId: number | null
    tripBetta: number
    dailyBetta: number
    appPayAdvance: number
}
export const createTripSalary = (data: tripSalaryProps) =>
    axiosInstance.post('/addTripSalary', data).then(getData)
export const getAllCementCompany = () => axiosInstance.get('/cementCompany').then(getData)
export const getTripSalaryDetailsById = (
    loadingPointId: number | null,
    unloadingPointId: number | null,
    stockPointId: number | null
) =>
    axiosInstance
        .get('/getTripSalaryDetails', {
            params: { loadingPointId, unloadingPointId, stockPointId }
        })
        .then(getData)
