import { axiosInstance, getData } from '../../wonderMove/services'
import { FieldValues } from '../components/cementCompany/company.tsx'

export const createCompany = (data: FieldValues) =>
    axiosInstance
        .post('/cementCompany', data)
        .then(getData)
        .catch(() => alert('Please provide valid details'))

export const getAllCementCompany = () => axiosInstance.get('/cementCompany').then(getData)
