import {
    acknowledgementFileByOverallTripId,
    acknowledgementFileGet
} from '../../../services/acknowlegementApproval'

const downloadFile = async (url: string, fileName: any) => {
    const response = await fetch(url)
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    const blob = await response.blob()
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

const extractBucketAndKey = (url: string) => {
    const urlObj = new URL(url)
    const bucketName = urlObj.hostname.split('.')[0]
    const objectKey = decodeURIComponent(urlObj.pathname.slice(1))
    return { bucketName, objectKey }
}

export const downloadAcknowledgementFile = (id: number) => {
    acknowledgementFileByOverallTripId(id).then(async (data) => {
        if (!data[0].acknowledgementPdfLink) {
            alert('No file')
            return
        }
        const { bucketName, objectKey } = extractBucketAndKey(data[0].acknowledgementPdfLink)
        await handleFileDownload(bucketName, objectKey)
    })
}
const handleFileDownload = async (bucketName: string, objectKey: string) => {
    try {
        const signedUrl = await acknowledgementFileGet(bucketName, objectKey)
        const fileName = objectKey.split('/').pop()
        await downloadFile(signedUrl, fileName)
    } catch (error) {
        console.error('Error downloading file:', error)
    }
}
