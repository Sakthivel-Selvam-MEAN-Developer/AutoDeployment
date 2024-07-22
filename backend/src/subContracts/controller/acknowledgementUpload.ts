import { S3Client } from '@aws-sdk/client-s3'
import multer from 'multer'
import multerS3 from 'multer-s3'
import configs from '../../config'
import dayjs from 'dayjs'

export const s3 = new S3Client({
    region: configs.REGION,
    credentials: {
        accessKeyId: configs.AWS_ACCESS_KEY,
        secretAccessKey: configs.AWS_SECRET_ACCESS_KEY
    }
})
const files = 'acknowledgement'
export const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: configs.S3_BUCKET_ACKNOWLEDGEMENT || 'acknowledgementapproval',
        metadata: (req, file, cb) => {
            console.log(req)
            cb(null, { fieldName: file.fieldname })
        },
        key: (req, file, cb) => {
            console.log(req)
            cb(null, `${files}/${dayjs().unix()}-${file.originalname}`)
        }
    })
}).single('image')
