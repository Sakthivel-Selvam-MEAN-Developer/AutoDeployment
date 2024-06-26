import supertest from 'supertest'
import { Prisma } from '@prisma/client'
import dayjs from 'dayjs'
import { NextFunction } from 'express'
import { app } from '../../app.ts'

const mockCreateFuel = vi.fn()
const mockFuelDetails = vi.fn()
const mockFuelWithoutTrip = vi.fn()
const mockUpdateFuelWithTrip = vi.fn()
const mockGetOnlyActiveTripByVehicle = vi.fn()
const mockCreateOverallTrip = vi.fn()
const mockCreatePaymentDues = vi.fn()
const mockGetActiveTripByVehicle = vi.fn()
const mockGetFuelReport = vi.fn()
const mockGetFuelTransactionId = vi.fn()
const mockGetFuelReportCount = vi.fn()

vi.mock('../models/fuel', () => ({
    create: (inputs: Prisma.fuelCreateInput) => mockCreateFuel(inputs),
    getAllFuel: () => mockFuelDetails(),
    updateFuelWithTripId: ({ id, tripId }: { id: number; tripId: number }) =>
        mockUpdateFuelWithTrip({ id, tripId }),
    getFuelWithoutTrip: (vehiclenumber: string) => mockFuelWithoutTrip(vehiclenumber),
    getFuelReport: (
        bunkId: string,
        paymentStatus: string,
        vehicleNumber: string,
        from: string,
        to: string,
        skipNumber: number
    ) => mockGetFuelReport(bunkId, paymentStatus, vehicleNumber, from, to, skipNumber),
    getFuelReportCount: (
        bunkId: string,
        paymentStatus: string,
        vehicleNumber: string,
        from: string,
        to: string,
        skipNumber: number
    ) => mockGetFuelReportCount(bunkId, paymentStatus, vehicleNumber, from, to, skipNumber)
}))
vi.mock('../models/paymentDues', () => ({
    create: (inputs: any) => mockCreatePaymentDues(inputs),
    getFuelTransactionId: (inputs: any) => mockGetFuelTransactionId(inputs)
}))
vi.mock('../models/overallTrip', () => ({
    create: (inputs: any) => mockCreateOverallTrip(inputs),
    getOnlyActiveTripByVehicle: (inputs: any) => mockGetOnlyActiveTripByVehicle(inputs),
    getActiveTripByVehicle: (inputs: any) => mockGetActiveTripByVehicle(inputs)
}))
vi.mock('../../auditRoute.ts', () => ({
    auditRoute: (_req: Request, _res: Response, next: NextFunction) => {
        next()
    }
}))
const mockFuel = {
    id: 1,
    vehicleNumber: 'TN93D5512',
    pricePerliter: 102.5,
    quantity: 60.754,
    fuelStationId: 1,
    totalprice: 6227.285,
    overallTripId: 1
}
const mockCreatePaymentDuesData1 = [
    {
        name: 'Barath Petroleum',
        type: 'fuel pay',
        vehicleNumber: 'TN93D5512',
        dueDate: dayjs().subtract(1, 'day').startOf('day').unix(),
        payableAmount: 6227.285
    }
]
const mockFuelWithoutTripData = {
    vehicleNumber: 'TN93D5512',
    pricePerliter: 102.5,
    quantity: 60.754,
    totalprice: 6227.285,
    loadingPointToUnloadingPointTripId: null
}
const mockUpdateFuelWithTripData = {
    vehicleNumber: 'TN93D5512',
    pricePerliter: 102.5,
    quantity: 60.754,
    totalprice: 6227.285,
    loadingPointToUnloadingPointTripId: 1
}
describe('Bunk Controller', () => {
    test('should able to create Bunk with dues', async () => {
        mockGetOnlyActiveTripByVehicle.mockResolvedValue(null)
        mockCreateFuel.mockResolvedValue(mockFuel)
        mockGetActiveTripByVehicle.mockResolvedValue(null)
        mockCreatePaymentDues.mockResolvedValue(mockCreatePaymentDuesData1)
        await supertest(app).post('/api/fuel/Barath%20Petroleum').expect(200)
        expect(mockCreateFuel).toBeCalledTimes(1)
    })
    test('should able to access', async () => {
        mockFuelDetails.mockResolvedValue({ pricePerliter: 102 })
        await supertest(app).get('/api/fuel').expect({ pricePerliter: 102 })
        expect(mockFuelDetails).toBeCalledWith()
    })
    test('should able to get the fuel without tripId', async () => {
        mockFuelWithoutTrip.mockResolvedValue(mockFuelWithoutTripData)
        await supertest(app).get('/api/fuel/TN93D5512').expect(mockFuelWithoutTripData)
        expect(mockFuelWithoutTrip).toBeCalledTimes(1)
    })
    test('should able to update fuel with tripId', async () => {
        mockUpdateFuelWithTrip.mockResolvedValue(mockUpdateFuelWithTripData)
        await supertest(app).put('/api/fuel-update').expect(mockUpdateFuelWithTripData)
        expect(mockUpdateFuelWithTrip).toBeCalledTimes(1)
    })
})
describe('Fuel report List', () => {
    test('should generate fuel report', async () => {
        mockGetFuelReport.mockResolvedValue([
            {
                id: 1,
                fueledDate: 1718735400,
                vehicleNumber: 'TN93D5512',
                quantity: 100,
                pricePerliter: 50,
                totalprice: 5000,
                invoiceNumber: 'dddd',
                bunk: {
                    bunkName: 'SRK Barath Petroleum'
                },
                overallTrip: {
                    id: 1,
                    loadingPointToStockPointTrip: null,
                    loadingPointToUnloadingPointTrip: {
                        invoiceNumber: 'ABC123',
                        loadingPoint: {
                            name: 'Chennai-south'
                        },
                        unloadingPoint: {
                            name: 'Salem'
                        }
                    }
                }
            }
        ])
        mockGetFuelTransactionId.mockResolvedValue({ transactionId: 'ABC123' })
        mockGetFuelReportCount.mockResolvedValue(1)
        await supertest(app)
            .get('/api/getAllFuelReport')
            .query({
                bunkId: 1,
                paymentStatus: 'false',
                vehicleNumber: 'TN93D5512',
                from: 1718735400,
                to: 1718735400,
                pageNumber: 0
            })
            .expect(200)
        expect(mockGetFuelReport).toBeCalledTimes(1)
        expect(mockGetFuelTransactionId).toBeCalledTimes(1)
        expect(mockGetFuelReportCount).toBeCalledTimes(1)
    })
    test('should generate fuel report without trip', async () => {
        mockGetFuelReport.mockResolvedValue([
            {
                id: 1,
                fueledDate: 1718735400,
                vehicleNumber: 'TN93D5512',
                quantity: 100,
                pricePerliter: 50,
                totalprice: 5000,
                invoiceNumber: 'dddd',
                bunk: {
                    bunkName: 'SRK Barath Petroleum'
                },
                overallTrip: null
            }
        ])
        mockGetFuelReportCount.mockResolvedValue(2)
        await supertest(app)
            .get('/api/getAllFuelReport')
            .query({
                bunkId: 1,
                paymentStatus: 'false',
                vehicleNumber: 'TN93D5512',
                from: 1718735400,
                to: 1718735400,
                pageNumber: 0
            })
            .expect(200)
        expect(mockGetFuelReport).toBeCalledTimes(2)
        expect(mockGetFuelTransactionId).toBeCalledTimes(2)
        expect(mockGetFuelReportCount).toBeCalledTimes(2)
    })
    test('should generate fuel report without stockPoint To UnloadingPoint Trip', async () => {
        mockGetFuelReport.mockResolvedValue([
            {
                id: 1,
                fueledDate: 1718735400,
                vehicleNumber: 'TN93D5512',
                quantity: 100,
                pricePerliter: 50,
                totalprice: 5000,
                invoiceNumber: 'dddd',
                bunk: {
                    bunkName: 'SRK Barath Petroleum'
                },
                overallTrip: {
                    id: 1,
                    loadingPointToUnloadingPointTrip: null,
                    loadingPointToStockPointTrip: {
                        stockPointToUnloadingPointTrip: [
                            {
                                unloadingPoint: {
                                    name: 'erode'
                                }
                            }
                        ],
                        invoiceNumber: 'ABC123',
                        loadingPoint: {
                            name: 'Chennai-south'
                        },
                        unloadingPoint: {
                            name: 'Salem'
                        }
                    }
                }
            }
        ])
        mockGetFuelTransactionId.mockResolvedValue({ transactionId: 'ABC123' })
        mockGetFuelReportCount.mockResolvedValue(3)
        await supertest(app)
            .get('/api/getAllFuelReport')
            .query({
                bunkId: 1,
                paymentStatus: 'false',
                vehicleNumber: 'TN93D5512',
                from: 1718735400,
                to: 1718735400,
                pageNumber: 0
            })
            .expect(200)
        expect(mockGetFuelReport).toBeCalledTimes(3)
        expect(mockGetFuelTransactionId).toBeCalledTimes(3)
        expect(mockGetFuelReportCount).toBeCalledTimes(3)
    })
})
