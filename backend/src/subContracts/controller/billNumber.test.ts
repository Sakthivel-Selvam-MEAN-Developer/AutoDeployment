import supertest from 'supertest'
import { NextFunction } from 'express'
import { app } from '../../app.ts'

const mockBillNumber = vi.fn()
const mockUpdateBillNumber = vi.fn()

vi.mock('../models/billNumber', () => ({
    getBillNumber: () => mockBillNumber(),
    updateBillNumber: (inputs: any) => mockUpdateBillNumber(inputs)
}))
vi.mock('../../auditRoute.ts', () => ({
    auditRoute: (_req: Request, _res: Response, next: NextFunction) => {
        next()
    }
}))

describe('Bill Number Controller', async () => {
    test('should able to get last bill nnumber', async () => {
        mockBillNumber.mockResolvedValue({ lastBillNo: 'MGL23A-0' })
        await supertest(app).get('/api/bill').expect({ lastBillNo: 'MGL23A-0' })
        expect(mockBillNumber).toBeCalledWith()
    })
    // test('should able to update bill number', async () => {
    //     mockUpdateBillNumber.mockResolvedValue(mockUpdateBillNo)
    //     await supertest(app).put('/api/update').expect(mockUpdateBillNo)
    //     expect(mockUpdateBillNumber).toBeCalledTimes(1)
    // })
})
