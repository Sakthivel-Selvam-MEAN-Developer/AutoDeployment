import AWS from 'aws-sdk'
import dayjs from 'dayjs'
import configs from '../../config.ts'
import logger from '../../logger.ts'

export const uploadToS3 = async (pdfBuffer: ArrayBuffer, companyName: string, billNo: string) => {
    AWS.config.update({
        accessKeyId: configs.AWS_ACCESS_KEY,
        secretAccessKey: configs.AWS_SECRET_ACCESS_KEY,
        region: configs.REGION
    })
    const s3 = new AWS.S3({
        region: configs.REGION
    })
    const params = {
        Bucket: configs.S3_BUCKET,
        Key: `Magnum/${dayjs().format('MMMM_YYYY')}/${companyName}/${billNo}.pdf`,
        Body: pdfBuffer,
        ContentType: 'application/pdf'
    }
    return s3.upload(params, (err: Error, data: { Location: string }) => {
        if (err) logger.error('Error uploading to S3 : ', err)
        else return data.Location
    })
}
