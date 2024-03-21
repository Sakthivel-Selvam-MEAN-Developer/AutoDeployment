import { axiosInstance, getData } from '../../apiCalls'

export const getEmployeeName = (employeeId: string) =>
    axiosInstance.get(`/employees/${employeeId}`).then(getData)
