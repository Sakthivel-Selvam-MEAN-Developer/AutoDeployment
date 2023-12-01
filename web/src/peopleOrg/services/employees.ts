import { axiosInstance, getData } from '../../wonderMove/services'

export const getEmployeeName = (employeeId: string) =>
    axiosInstance.get(`/employees/${employeeId}`).then(getData)
