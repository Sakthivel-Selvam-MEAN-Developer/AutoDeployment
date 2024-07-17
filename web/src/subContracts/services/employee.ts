import { FieldValues } from 'react-hook-form'
import { axiosInstance, getData } from '../../apiCalls'

export const createEmployee = (data: FieldValues) =>
    axiosInstance.post('/employee', data).then(getData)

export const getAllEmployee = () =>
    axiosInstance
        .get('/getAllEmployee')
        .then(getData)
        .catch(() => alert('Error Getting data'))

export const updateEmployee = (id: number | null, data: FieldValues) =>
    axiosInstance
        .put(`/updateEmployee`, { id, data })
        .then(getData)
        .catch((e) => alert(e.response.data))
