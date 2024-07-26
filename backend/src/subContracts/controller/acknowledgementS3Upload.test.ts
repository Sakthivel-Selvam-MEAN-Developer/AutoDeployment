import { NextFunction, Request, Response } from 'express'
import { Role } from '../roles'
import { vi } from 'vitest'
import { createMulterMiddleware } from './acknowledgementUpload'
import { handleFileUpload } from './acknowledgementS3Upload'
import multer from 'multer'
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
const mockAuth = vi.fn()
vi.mock('../routes/authorise', () => ({
    authorise: (role: Role[]) => (_req: Request, _res: Response, next: NextFunction) => {
        mockAuth(role)
        next()
    }
}))

vi.mock('multer-s3', () => {
    return {
        __esModule: true,
        default: vi.fn().mockImplementation(() => multer.memoryStorage())
    }
})
vi.mock('../../auditRoute.ts', () => ({
    auditRoute: (_req: Request, _res: Response, next: NextFunction) => {
        next()
    }
}))
vi.mock('./acknowledgementUpload')

describe('Upload Middleware', () => {
    let req: Partial<Request>
    let res: Partial<Response>
    let next: NextFunction
    beforeEach(() => {
        req = {
            query: {
                companyName: 'Test Company',
                invoiceNumber: '12345'
            }
        }
        res = {}
        next = vi.fn() as unknown as NextFunction
    })
    test('should call createMulterMiddleware and handle errors', async () => {
        const mockUploadMiddleware = vi.fn((_req: any, _res: any, callback: (err: any) => void) => {
            callback(null)
        })
        vi.mocked(createMulterMiddleware).mockReturnValue(mockUploadMiddleware)
        await handleFileUpload(req as Request, res as Response, next)
        expect(createMulterMiddleware).toHaveBeenCalledWith('image', {
            companyName: req.query?.companyName,
            invoiceNumber: req.query?.invoiceNumber
        })
        expect(mockUploadMiddleware).toHaveBeenCalledWith(req, res, expect.any(Function))
        expect(next).toHaveBeenCalled()
    })
})
