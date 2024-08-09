import supertest from 'supertest'
import { NextFunction, Request, Response } from 'express'
import { app } from '../../app.ts'
import { Role } from '../roles.ts'

const mockAccountTypes = vi.fn()

const mockAuth = vi.fn()
vi.mock('../routes/authorise', () => ({
    authorise: (role: Role[]) => (_req: Request, _res: Response, next: NextFunction) => {
        mockAuth(role)
        next()
    }
}))
vi.mock('../models/accountType', () => ({
    getAllAccountTypes: () => mockAccountTypes()
}))
vi.mock('../../auditRoute.ts', () => ({
    auditRoute: (_req: Request, _res: Response, next: NextFunction) => {
        next()
    }
}))
const mockAccountType = {
    accountTypeName: 'Savings Account',
    accountTypeNumber: 10
}

describe('AccountType Controller', () => {
    test('should able to access', async () => {
        mockAccountTypes.mockResolvedValue(mockAccountType)
        await supertest(app)
            .get('/api/accountType')
            .expect({ accountTypeName: 'Savings Account', accountTypeNumber: 10 })
        expect(mockAccountTypes).toBeCalledTimes(1)
        expect(mockAuth).toBeCalledWith(['Employee'])
    })
})
