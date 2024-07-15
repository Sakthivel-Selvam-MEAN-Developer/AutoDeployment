import { axiosInstance, getData } from '../../apiCalls'
import { FieldValues } from '../components/cementCompany/company.tsx'

interface company {
    data: FieldValues
    id: number
}
export const createCompany = (details: company) =>
    axiosInstance.post('/cementCompany', details).then(getData)

export const getAllCementCompany = () =>
    axiosInstance
        .get('/cementCompany')
        .then(getData)
        .catch(() => alert('Error Getting data'))
