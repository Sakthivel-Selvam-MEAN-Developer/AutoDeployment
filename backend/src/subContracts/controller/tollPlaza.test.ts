import supertest from 'supertest'
import { NextFunction } from 'express'
import { app } from '../../app.ts'

const mockTollPlazaLocation = vi.fn()
const mockUpdateTollPlaza = vi.fn()
const mockTollLocationNotEmpty = vi.fn()
const mockTollLocation = vi.fn()
const mockTollPlazaLocations = vi.fn()
const mockUpdateTollPlazaAmount = vi.fn()
const mockUpdateBillDetails = vi.fn()

vi.mock('../models/tollPlaza', () => ({
    create: (inputs: any) => mockTollPlazaLocation(inputs),
    updateBillStatus: (inputs: any) => mockUpdateTollPlaza(inputs),
    updateTollAmount: (inputs: any) => mockUpdateTollPlazaAmount(inputs),
    getTollLocations: () => mockTollPlazaLocations(),
    updateBillDetails: (tollIds: number[], billDetails: any) =>
        mockUpdateBillDetails(tollIds, billDetails)
}))
vi.mock('../models/overallTrip', () => ({
    getOveralltripByTollNotEmpty: () => mockTollLocationNotEmpty(),
    getOveralltripByToll: () => mockTollLocation()
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
const mockTollPlaza = {
    id: 1,
    tollPlaza: [],
    loadingPointToUnloadingPointTrip: {
        invoiceNumber: 'zx',
        loadingPoint: {
            id: 1,
            name: 'Chennai-south',
            cementCompanyId: 1,
            pricePointMarkerId: 1
        },
        unloadingPoint: {
            id: 1,
            name: 'Salem',
            cementCompanyId: 1,
            pricePointMarkerId: 2
        },
        startDate: 1717612200,
        truck: {
            vehicleNumber: 'TN30S4325'
        }
    },
    loadingPointToStockPointTrip: null,
    stockPointToUnloadingPointTrip: null
}
const mockTollPlazaLocationsData = [
    {
        id: 1,
        location: 'Dhone',
        state: 'AP'
    }
]
const mockReqForUpdateBillDetails = {
    overallTripIds: [1],
    data: { billNo: 'MGL-01', billDate: 1719014400 }
}
const mockTollAmount = {
    tollPlaza: {
        id: 1,
        amount: 900
    }
}
describe('TollPlaza Controller', () => {
    test('should able to create tollPlazaLocation', async () => {
        mockTollPlazaLocation.mockResolvedValue(mockCreateData)
        await supertest(app).post('/api/toll').send(mockToll.body).expect(200)
        expect(mockTollPlazaLocation).toBeCalledTimes(1)
    })
    test('should update the tollPlazaAmount', async () => {
        mockUpdateTollPlazaAmount.mockResolvedValue(mockTollAmount)
        await supertest(app)
            .put('/api/toll/update/amount')
            .send(mockTollAmount.tollPlaza)
            .expect(200)
        expect(mockUpdateTollPlazaAmount).toBeCalledTimes(1)
    })
    test('should able to getTollPlaza is empty', async () => {
        mockTollLocation.mockResolvedValue(mockTollPlaza)
        await supertest(app).get('/api/toll').expect(200)
        expect(mockTollLocation).toHaveBeenCalledTimes(1)
    })
    test('should able to getTollPlaza is not empty', async () => {
        mockTollLocationNotEmpty.mockResolvedValue({
            ...mockTollPlaza,
            tollPlaza: [
                {
                    id: 2,
                    tollPlazaLocation: {
                        id: '3',
                        location: 'Dhone',
                        state: 'KA'
                    },
                    amount: 1200
                }
            ]
        })
        await supertest(app).get('/api/toll/invoice').expect(200)
        expect(mockTollLocationNotEmpty).toHaveBeenCalledTimes(1)
    })
    test('should able to getTollPlaza location', async () => {
        mockTollPlazaLocations.mockResolvedValue(mockTollPlazaLocationsData)
        await supertest(app).get('/api/toll/locations/state').expect(200)
        expect(mockTollPlazaLocations).toBeCalledTimes(1)
    })
    test('should able to update bill details for toll by overalltrip ids', async () => {
        mockUpdateBillDetails.mockResolvedValue({ count: 1 })
        await supertest(app)
            .put('/api/toll/update/billDetails')
            .send(mockReqForUpdateBillDetails)
            .expect(200)
        expect(mockUpdateBillDetails).toBeCalledTimes(1)
        expect(mockUpdateBillDetails).toHaveBeenCalledWith(
            mockReqForUpdateBillDetails.overallTripIds,
            mockReqForUpdateBillDetails.data
        )
    })
})
