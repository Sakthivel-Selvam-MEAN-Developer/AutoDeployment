import { Readable } from 'stream'
import { getFileFromS3 } from './acknowledgementGet'

vi.mock('../../config', () => ({
    __esModule: true,
    default: {
        REGION: 'mock-region',
        AWS_ACCESS_KEY: 'mock-access-key',
        AWS_SECRET_ACCESS_KEY: 'mock-secret-key'
    }
}))

vi.mock('@aws-sdk/client-s3', () => ({
    S3Client: vi.fn().mockImplementation(() => ({
        send: vi.fn(() => ({
            Body: {}
        }))
    })),
    GetObjectCommand: vi.fn()
}))

describe('getFileFromS3', () => {
    test('should return file content when the stream is readable', async () => {
        vi.mock('@aws-sdk/client-s3', () => ({
            S3Client: vi.fn().mockImplementation(() => ({
                send: vi.fn(() => ({
                    Body: new Readable({
                        read() {
                            this.push('file ')
                            this.push('content')
                            this.push(null)
                        }
                    })
                }))
            })),
            GetObjectCommand: vi.fn()
        }))
        const mockBucketName = 'test-bucket'
        const mockFileName = 'test-file.txt'

        const result = await getFileFromS3(mockBucketName, mockFileName)

        expect(result).toBe('file content')
    })
})
