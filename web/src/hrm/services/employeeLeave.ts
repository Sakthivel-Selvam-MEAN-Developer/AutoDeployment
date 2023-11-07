import { axiosInstance, getData } from "../../wonderMove/services/index.ts";

export const create = (data: any) =>
    axiosInstance.post('/employee', data).then(getData)