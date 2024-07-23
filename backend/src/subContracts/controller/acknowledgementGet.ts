import { S3Client, GetObjectCommand, GetObjectCommandOutput } from '@aws-sdk/client-s3'
import configs from '../../config'
import { Readable } from 'stream'
const s3 = new S3Client({
    region: configs.REGION,
    credentials: {
        accessKeyId: configs.AWS_ACCESS_KEY,
        secretAccessKey: configs.AWS_SECRET_ACCESS_KEY
    }
})
export const streamToBuffer = (stream: Readable): Promise<Buffer> => {
    return new Promise((resolve, reject) => {
        const chunks: Buffer[] = []
        stream.on('data', (chunk) => chunks.push(chunk))
        stream.on('end', () => resolve(Buffer.concat(chunks)))
        stream.on('error', reject)
    })
}
export const getFileFromS3 = async (bucketName: string, fileName: string) => {
    const params = { Bucket: bucketName, Key: fileName }
    const command = new GetObjectCommand(params)
    const data: GetObjectCommandOutput = await s3.send(command)
    if (data.Body instanceof Readable) {
        const buffer = await streamToBuffer(data.Body)
        const fileContent = buffer.toString('utf-8')
        return fileContent
    }
}
