import { axiosInstance, getData } from '../../wonderMove/services'
import { FieldValues } from '../components/cementCompany/company.tsx'
import { tokenProps } from './acknowledgement.tsx'

export const createCompany = (data: FieldValues, token: tokenProps | undefined) =>
    axiosInstance.post('/cementCompany', data, token).then(getData)

export const getAllCementCompany = () =>
    axiosInstance
        .get('/cementCompany')
        .then(getData)
        .catch(() => alert('Error Getting data'))
