import { axiosInstance, getData } from '../../apiCalls'

export const getBillsWithNoSubmissionDate = () =>
    axiosInstance
        .get(`/submissiondate`)
        .then(getData)
        .catch(() => alert('Error Getting data'))
