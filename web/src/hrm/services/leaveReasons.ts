import { axiosInstance, getData } from '../../wonderMove/services/index.ts'

export const getAllLeaveReasons = (data: any) =>
    axiosInstance.get('/leaveReason', data).then(getData)
