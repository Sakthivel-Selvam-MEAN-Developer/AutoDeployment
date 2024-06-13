import supertest from 'supertest'
import { NextFunction } from 'express'
import { app } from '../../app.ts'

const mockTollPlazaLocation = vi.fn()
const mockUpdateTollPlaza = vi.fn()

vi.mock('../models/tollPlaza', () => ({
    create: (inputs: any) => mockTollPlazaLocation(inputs),
    updateBillStatus: (inputs: any) => mockUpdateTollPlaza(inputs)
}))
vi.mock('../../auditRoute.ts', () => ({
    auditRoute: (_req: Request, _res: Response, next: NextFunction) => {
        next()
    }
}))
const mockCreateData = { count: 2 }

const mockToll = {
    body: [
        {
            overallTripId: 1,
            tollPlazaLocation: 'Dhone',
            amount: 500
        },
        {
            overallTripId: 1,
            tollPlazaLocation: 'Salam',
            amount: 300
        }
    ]
}
const mockTollData = {
    body: {
        overallTripId: 1,
        data: {
            billNo: 'Aaa123',
            billDate: 1718262220
        }
    }
}

describe('TollPlaza Controller', () => {
    test('should able to create tollPlazaLocation', async () => {
        mockTollPlazaLocation.mockResolvedValue(mockCreateData)
        await supertest(app).post('/api/toll').send(mockToll.body).expect(200)
        expect(mockTollPlazaLocation).toBeCalledTimes(1)
    })
    test('should update the tollPlazaLocation', async () => {
        mockUpdateTollPlaza.mockResolvedValue(mockCreateData)
        await supertest(app).put('/api/toll').send(mockTollData.body).expect(200)
        expect(mockUpdateTollPlaza).toBeCalledTimes(1)
    })
})
