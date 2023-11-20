import { axiosInstance, getData } from '../../wonderMove/services/index.ts'

export const getAllLeaveAfterApply = (employeeId: string) =>
    axiosInstance.get(`/org-leaves/${employeeId}`).then(getData)
