import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import configs from '../../config'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
const s3 = new S3Client({
    region: configs.REGION,
    credentials: {
        accessKeyId: configs.AWS_ACCESS_KEY,
        secretAccessKey: configs.AWS_SECRET_ACCESS_KEY
    }
})
export const getFileFromS3 = async (bucketName: string, fileName: string) => {
    const params = { Bucket: bucketName, Key: fileName }
    const command = new GetObjectCommand(params)
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 })
    return url
}
