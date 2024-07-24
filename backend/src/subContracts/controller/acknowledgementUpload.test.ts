import { NextFunction, Request, Response } from 'express'
import multer from 'multer'
import multerS3 from 'multer-s3'
import { Role } from '../roles'
import dayjs from 'dayjs'

vi.mock('../../config', () => ({
    __esModule: true,
    default: {
        REGION: 'mock-region',
        AWS_ACCESS_KEY: 'mock-access-key',
        AWS_SECRET_ACCESS_KEY: 'mock-secret-key'
    }
}))

vi.mock('@aws-sdk/client-s3', () => {
    return {
        S3Client: vi.fn().mockImplementation(() => ({
            send: vi.fn()
        }))
    }
})

vi.mock('multer-s3', () => {
    return {
        __esModule: true,
        default: vi.fn().mockImplementation(() => multer.memoryStorage())
    }
})
const mockAuth = vi.fn()
vi.mock('../routes/authorise', () => ({
    authorise: (role: Role[]) => (_req: Request, _res: Response, next: NextFunction) => {
        mockAuth(role)
        next()
    }
}))
vi.mock('../../auditRoute.ts', () => ({
    auditRoute: (_req: Request, _res: Response, next: NextFunction) => {
        next()
    }
}))
const mockFile = {
    fieldname: 'acknowledgement',
    originalname: 'test.pdf',
    encoding: '7bit',
    mimetype: 'application/pdf',
    buffer: Buffer.from('test'),
    size: 4,
    stream: vi.fn()
}
const mockReq = {
    file: mockFile,
    get: (headerName: string) => (headerName === 'host' ? 'localhost' : undefined),
    headers: {
        'content-type': 'multipart/form-data',
        host: ['localhost']
    },
    body: {}
} as unknown as Request
const mockRes = {} as Response
const mockNext = vi.fn()
vi.mock('../acknowledgementUpload', () => ({
    getFolderName: vi.fn(() => 'mocked-folder')
}))
const { upload } = await import('../controller/acknowledgementUpload')
const multerS3Mock = vi.mocked(multerS3).mockImplementation((options: any) => {
    console.log(options)
    return multer.memoryStorage()
})
const middleFunction = async () => {
    const middleware = upload
    await new Promise<void>((resolve, reject) => {
        middleware(mockReq, mockRes, (err) => {
            if (err) return reject(err)
            resolve()
        })
    })
}
const inputReq = {
    file: mockFile,
    get: (headerName: string) => (headerName === 'host' ? 'localhost' : undefined),
    headers: {
        'content-type': 'multipart/form-data',
        host: ['magnum']
    },
    body: {}
} as unknown as Request
const testHelperReq = async () => {
    expect(mockReq?.file?.originalname).toBe('test.pdf')
}
const testHelper = async () => {
    await middleFunction()
    expect(mockNext).not.toHaveBeenCalledWith(expect.any(Error))
    expect(mockReq.file).toBeDefined()
    expect(mockReq?.file?.fieldname).toBe('acknowledgement')
    testHelperReq()
}
const metadataCb = (err: any, data: any) => {
    console.log(err)
    expect(data).toEqual({ fieldName: mockFile.fieldname })
}
describe('Upload Middleware', () => {
    test('should upload file to S3', async () => {
        testHelper()
        const multerS3Options: any = multerS3Mock.mock.calls[0]?.[0]
        if (multerS3Options) {
            multerS3Options.metadata(mockReq, mockFile, metadataCb)
            const keyCb = (err: any, data: any) => {
                console.log(err)
                expect(data).toStrictEqual(
                    `${mockFile.fieldname}/${dayjs().unix()}-${mockFile.originalname}`
                )
            }
            multerS3Options.key(mockReq, mockFile, keyCb)
        }
    })
})
describe('Upload Middleware', () => {
    test('should upload file to S3 for magnum ', async () => {
        testHelper()
        const multerS3Options: any = multerS3Mock.mock.calls[0]?.[0]
        if (multerS3Options) {
            multerS3Options.metadata(mockReq, mockFile, metadataCb)
            const keyCb = (err: any, data: any) => {
                console.log(err)
                expect(data).toStrictEqual(
                    `${mockFile.fieldname}/${dayjs().unix()}-${mockFile.originalname}`
                )
            }
            multerS3Options.key(inputReq, mockFile, keyCb)
        }
    })
})
