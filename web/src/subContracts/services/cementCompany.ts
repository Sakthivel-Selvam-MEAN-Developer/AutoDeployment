import { axiosInstance, getData } from '../../apiCalls'
import { FieldValues } from '../components/cementCompany/company.tsx'

export const createCompany = (data: FieldValues) =>
    axiosInstance.post('/cementCompany', data).then(getData)

export const getAllCementCompany = () =>
    axiosInstance
        .get('/cementCompany')
        .then(getData)
        .catch(() => alert('Error Getting data'))
