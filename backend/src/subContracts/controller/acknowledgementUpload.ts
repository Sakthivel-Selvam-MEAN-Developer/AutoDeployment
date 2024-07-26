import { S3Client } from '@aws-sdk/client-s3'
import multer from 'multer'
import multerS3 from 'multer-s3'
import configs from '../../config'
import dayjs from 'dayjs'
import { ParsedQs } from 'qs'

export const s3 = new S3Client({
    region: configs.REGION,
    credentials: {
        accessKeyId: configs.AWS_ACCESS_KEY,
        secretAccessKey: configs.AWS_SECRET_ACCESS_KEY
    }
})

let files = 'Magnum'
const getFolderName = (req: any) =>
    req.headers.host.includes('localhost') ? (files = 'testacknowledgementapproval') : files

interface details {
    companyName: string | ParsedQs | string[] | ParsedQs[] | undefined
    invoiceNumber: string | ParsedQs | string[] | ParsedQs[] | undefined
}
export const createMulterMiddleware = (fileFieldName: string, requestData: details) => {
    return multer({
        storage: multerS3({
            s3: s3,
            bucket: configs.S3_BUCKET_ACKNOWLEDGEMENT || 'acknowledgementapproval',
            metadata: (_req, file, cb) => {
                cb(null, { fieldName: file.fieldname })
            },
            key: (req, file, cb) => {
                const fileType = file.mimetype.split('/')[1]
                const folderName = getFolderName(req)
                cb(
                    null,
                    `${folderName}/${dayjs().format('MMMM_YYYY')}/${requestData.companyName}/${requestData.invoiceNumber}.${fileType}`
                )
            }
        })
    }).single(fileFieldName)
}
