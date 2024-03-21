import { axiosInstance, getData } from '../../apiCalls'

export const getAllTransporter = () =>
    axiosInstance
        .get('/transporter')
        .then(getData)
        .catch(() => alert('Error Getting data'))

export const getAllTransporterName = () =>
    axiosInstance
        .get('/transporter_name')
        .then(getData)
        .catch(() => alert('Error Getting data'))
interface dataProps {
    hasGst: boolean
    hasTds: boolean
    tdsPercentage: number | null
    gstPercentage: number | null
    gstNumber: string
    accountTypeNumber: number | undefined
}
export const createTransporter = (data: dataProps) =>
    axiosInstance.post('/transporter', data).then(getData)
