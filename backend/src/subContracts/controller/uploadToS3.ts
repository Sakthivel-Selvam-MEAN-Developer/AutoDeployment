// import AWS from 'aws-sdk'
// import dayjs from 'dayjs'
// import configs from '../../config.ts'
// import logger from '../../logger.ts'

// AWS.config.update({
//     accessKeyId: configs.AWS_ACCESS_KEY,
//     secretAccessKey: configs.AWS_SECRET_ACCESS_KEY,
//     region: configs.REGION
// })
// export const s3 = new AWS.S3()
// export const uploadParams = (pdfBuffer: ArrayBuffer, companyName: string, billNo: string) => {
//     return {
//         Bucket: configs.S3_BUCKET,
//         Key: `Magnum/${dayjs().format('MMMM_YYYY')}/${companyName}/${billNo}.jpg`,
//         Body: pdfBuffer,
//         ContentType: 'application/pdf'
//     }
// }
// const uploadToS3Helper = async (params: AWS.S3.PutObjectRequest) => {
//     try {
//         const data = await s3.upload(params).promise()
//         return data.Location
//     } catch (err) {
//         logger.error('Error uploading to S3:', err)
//         throw new Error('Error uploading to S3')
//     }
// }

// export const uploadToS3 = async (pdfBuffer: ArrayBuffer, companyName: string, billNo: string) => {
//     const params = uploadParams(pdfBuffer, companyName, billNo)
//     console.log(pdfBuffer)
//     return await uploadToS3Helper(params)
// }
