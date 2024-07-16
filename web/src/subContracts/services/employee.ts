import { FieldValues } from 'react-hook-form'
import { axiosInstance, getData } from '../../apiCalls'

export const createEmployee = (data: FieldValues) =>
    axiosInstance.post('/employee', data).then(getData)
