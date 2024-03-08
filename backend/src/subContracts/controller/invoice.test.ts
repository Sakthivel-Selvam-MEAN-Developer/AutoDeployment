import supertest from 'supertest'
import { app } from '../../app.ts'

const mockGetInvoiceDetails = vi.fn()

vi.mock('../models/invoice', () => ({
    getInvoiceDetail: (inputs: any) => mockGetInvoiceDetails(inputs)
}))
vi.mock('../../keycloak-config.ts', () => ({
    default: {
        protect: () => (_req: any, _resp: any, next: any) => {
            next()
        },
        middleware: () => (_req: any, _resp: any, next: any) => {
            next()
        }
    }
}))
vi.mock('../../authorization', () => ({
    hasRole: () => (_req: any, _res: any, next: any) => {
        next()
    }
}))
const mockGetInvoiceDetail = [
    {
        loadingPointToUnloadingPointTrip: {
            startDate: 1707417000,
            unloadingPoint: {
                name: 'Salem'
            },
            freightAmount: 1000,
            truck: {
                vehicleNumber: 'TN29B3246'
            },
            filledLoad: 12,
            invoiceNumber: '231212'
        },
        stockPointToUnloadingPointTrip: null,
        loadingPointToStockPointTrip: null
    }
]

describe('Invoice Controller', async () => {
    test.skip('should able to get invoice details', async () => {
        mockGetInvoiceDetails.mockResolvedValue(mockGetInvoiceDetail)
        await supertest(app).put('/api/invoice').expect(200)
        expect(mockGetInvoiceDetails).toBeCalledTimes(1)
    })
})
