import { getFileFromS3 } from './acknowledgementGet'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'

vi.mock('../../config', () => ({
    __esModule: true,
    default: {
        REGION: 'mock-region',
        AWS_ACCESS_KEY: 'mock-access-key',
        AWS_SECRET_ACCESS_KEY: 'mock-secret-key'
    }
}))

vi.mock('@aws-sdk/client-s3', () => ({
    S3Client: vi.fn(),
    GetObjectCommand: vi.fn()
}))

vi.mock('@aws-sdk/s3-request-presigner', () => ({
    getSignedUrl: vi.fn()
}))

describe('getFileFromS3', () => {
    test('should return a signed URL for the requested file', async () => {
        const mockBucketName = 'test-bucket'
        const mockFileName = 'test-file.txt'
        const mockSignedUrl = 'https://mock-signed-url'

        vi.mocked(getSignedUrl).mockResolvedValue(mockSignedUrl)

        const result = await getFileFromS3(mockBucketName, mockFileName)
        expect(result).toBe(mockSignedUrl)
        expect(getSignedUrl).toHaveBeenCalledWith(
            expect.any(S3Client),
            expect.any(GetObjectCommand),
            { expiresIn: 3600 }
        )
    })
})
