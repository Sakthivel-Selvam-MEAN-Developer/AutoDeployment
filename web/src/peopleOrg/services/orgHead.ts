import { axiosInstance, getData } from '../../apiCalls'

export const getAllLeaveAfterApply = (employeeId: string) =>
    axiosInstance.get(`/org-leaves/${employeeId}`).then(getData)
