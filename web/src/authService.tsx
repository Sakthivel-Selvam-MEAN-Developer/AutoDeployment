import { axiosInstance, getData } from './wonderMove/services'
interface dataProps {
    headers: {
        authorization: string
    }
}
export const getAuthorization = (data: dataProps) =>
    axiosInstance
        .get(`/auth`, data)
        .then(getData)
        .catch(() => alert('Error Getting data'))
