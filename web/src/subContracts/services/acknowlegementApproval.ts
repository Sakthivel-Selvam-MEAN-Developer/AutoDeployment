import { axiosInstance, getData } from '../../apiCalls'

export const getTripForAcknowlegementApproval = () =>
    axiosInstance
        .get(`/acknowlegementapproval`)
        .then(getData)
        .catch(() => alert('Error Getting data'))

export const approveAcknowledgement = (
    id: number,
    unloadedQuantity: number,
    approvalStatus: boolean
) =>
    axiosInstance
        .put(`/acknowlegementapproval`, { id, unloadedQuantity, approvalStatus })
        .then(getData)
        .catch(() => alert('Error Getting data'))

export const acknowledgementFileGet = (bucketName: string, fileName: string) =>
    axiosInstance
        .get('/getAcknowledgementFile', { params: { bucketName, fileName } })
        .then(getData)
        .catch(() => alert('Error Getting data'))
export const acknowledgementFileByOverallTripId = (id: number) =>
    axiosInstance
        .get('/getAcknowledgementFileByOverallTripId', { params: { id } })
        .then(getData)
        .catch(() => alert('Error Getting data'))
