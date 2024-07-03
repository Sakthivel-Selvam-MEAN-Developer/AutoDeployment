import supertest from 'supertest'
import { Prisma } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'
import { app } from '../../app.ts'
import { Role } from '../roles.ts'

const mockGetAllActivetripTripByTripStatus = vi.fn()
const mockGetAllTripByAcknowledgementStatus = vi.fn()
const mockOverAllTripById = vi.fn()
const mockUpdateWeightForStockTrip = vi.fn()
const mockupdateUnloadingKilometer = vi.fn()
const mockUpdateWeightForTrip = vi.fn()

const mockAcknowledgeStatusforOverAllTrip = vi.fn()
const mockCreateShortageQuantity = vi.fn()
const mockGetPercentageByTransporter = vi.fn()
const mockcreatePaymentDues = vi.fn()
const mockGetShortageQuantityByOverallTripId = vi.fn()
const mockGetDueByOverallTripId = vi.fn()
const mockUpdateStockunloadingKilometer = vi.fn()

vi.mock('../models/overallTrip', () => ({
    getAllActivetripTripByTripStatus: () => mockGetAllActivetripTripByTripStatus(),
    getAllTripByAcknowledgementStatus: () => mockGetAllTripByAcknowledgementStatus(),
    getOverAllTripById: (inputs: any) => mockOverAllTripById(inputs),
    closeAcknowledgementStatusforOverAllTrip: (inputs: any) =>
        mockAcknowledgeStatusforOverAllTrip(inputs)
}))
vi.mock('../models/loadingToUnloadingTrip', () => ({
    updateUnloadingKilometer: (id: number, unloadingKilometer: number) =>
        mockupdateUnloadingKilometer(id, unloadingKilometer),
    updateUnloadWeightforTrip: (inputs: any, data: any) =>
        mockUpdateWeightForStockTrip(inputs, data)
}))
vi.mock('../models/loadingToStockPointTrip', () => ({
    updateStockunloadingKilometer: (inputs: any, data: any) =>
        mockUpdateStockunloadingKilometer(inputs, data)
}))
vi.mock('../models/stockPointToUnloadingPoint', () => ({
    updateUnloadWeightForStockTrip: (inputs: any, data: any) =>
        mockUpdateWeightForTrip(inputs, data)
}))
vi.mock('../models/shortageQuantity', () => ({
    create: (inputs: any) => mockCreateShortageQuantity(inputs),
    getShortageQuantityByOverallTripId: (inputs: any) =>
        mockGetShortageQuantityByOverallTripId(inputs)
}))
vi.mock('../models/transporter', () => ({
    getPercentageByTransporter: (tds: any) => mockGetPercentageByTransporter(tds)
}))
vi.mock('../models/paymentDues', () => ({
    create: (intputs: Prisma.paymentDuesCreateInput) => mockcreatePaymentDues(intputs),
    getDueByOverallTripId: (id: number) => mockGetDueByOverallTripId(id)
}))
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
const mockOverAllTrip = [
    {
        id: 1,
        acknowledgementStatus: false,
        stockPointToUnloadingPointTripId: null,
        loadingPointToUnloadingPointTripId: 1,
        loadingPointToStockPointTrip: null,
        truck: {
            vehicleNumber: 'TN93D5512',
            transporter: {
                name: 'Muthu Logistics',
                transporterType: 'Market',
                hasGst: true,
                gstPercentage: 10
            }
        },
        loadingPointToUnloadingPointTrip: {
            id: 1,
            truck: {
                vehicleNumber: 'TN93D5512',
                transporter: {
                    name: 'Muthu Logistics',
                    transporterType: 'Market',
                    hasGst: true,
                    gstPercentage: 10
                }
            },
            loadingPoint: {
                id: 1,
                name: 'Chennai-south'
            },
            unloadingPoint: {
                id: 1,
                name: 'Salem'
            },
            freightAmount: 1000,
            transporterAmount: 900
        }
    }
]
const mockOverAllTripByStockIdData = {
    id: 1,
    acknowledgementStatus: false,
    stockPointToUnloadingPointTripId: null,
    stockPointToUnloadingPointTrip: null,
    loadingPointToUnloadingPointTripId: 1,
    loadingPointToStockPointTrip: null,
    truck: {
        vehicleNumber: 'TN93D5512',
        transporter: {
            name: 'Muthu Logistics',
            hasGst: true,
            gstPercentage: 10
        }
    },
    loadingPointToUnloadingPointTrip: {
        id: 1,
        truck: {
            vehicleNumber: 'TN93D5512',
            transporter: {
                name: 'Muthu Logistics',
                hasGst: true,
                gstPercentage: 10
            }
        },
        loadingPoint: {
            id: 1,
            name: 'Chennai-south'
        },
        unloadingPoint: {
            id: 1,
            name: 'Salem'
        },
        freightAmount: 1000,
        transporterAmount: 900,
        totalFreightAmount: 40000,
        totalTransporterAmount: 36000
    }
}
const mockOverAllTripByTripIdData = {
    id: 1,
    acknowledgementStatus: false,
    stockPointToUnloadingPointTripId: 1,
    loadingPointToUnloadingPointTripId: null,
    truck: {
        vehicleNumber: 'TN93D5512',
        transporter: {
            name: 'Muthu Logistics',
            gstPercentage: 5
        }
    },
    loadingPointToStockPointTrip: {
        id: 1,
        truck: {
            vehicleNumber: 'TN93D5512',
            transporter: {
                name: 'Muthu Logistics',
                gstPercentage: 5
            }
        },
        loadingPoint: {
            id: 1,
            name: 'Salem'
        },
        stockPoint: {
            id: 1,
            name: 'Salem'
        },
        freightAmount: 1000,
        transporterAmount: 900,
        totalFreightAmount: 40000,
        totalTransporterAmount: 36000
    },
    loadingPointToUnloadingPointTrip: null,
    stockPointToUnloadingPointTrip: {
        id: 1,
        loadingPointToStockPointTrip: {
            id: 1,
            truck: {
                vehicleNumber: 'TN93D5512',
                transporter: {
                    name: 'Muthu Logistics',
                    gstPercentage: 5
                }
            },
            loadingPoint: {
                id: 1,
                name: 'Salem'
            },
            stockPoint: {
                id: 1,
                name: 'Salem'
            },
            freightAmount: 1000,
            transporterAmount: 900,
            totalFreightAmount: 40000,
            totalTransporterAmount: 36000
        },
        unloadingPoint: {
            id: 1,
            name: 'Salem'
        },
        freightAmount: 500,
        transporterAmount: 400,
        totalFreightAmount: 20000,
        totalTransporterAmount: 16000
    }
}
const mockUpdateData = {
    id: 1
}
const mockUnloadingKilometer = {
    id: 1,
    unloadingKilometer: 1000
}
const mockPercentageByTransporterData = {
    gstPercentage: 10
}
const mockAcknowledgeStatusforAllTrip = {
    id: 12,
    acknowledgementStatus: false,
    loadingPointToStockPointTrip: null,
    stockPointToUnloadingPointTrip: null,
    truck: {
        vehicleNumber: 'TN30S7777',
        transporter: {
            name: 'Muthu Logistics',
            transporterType: 'Market'
        }
    },
    loadingPointToUnloadingPointTrip: {
        startDate: new Date(2023, 10, 24).getTime() / 1000,
        filledLoad: 40,
        invoiceNumber: 'ABC123',
        freightAmount: 1000,
        transporterAmount: 900,
        totalFreightAmount: 40000,
        totalTransporterAmount: 36000,
        margin: 4000,
        tripStatus: false,
        wantFuel: true,
        truck: {
            vehicleNumber: 'TN30S7777',
            transporter: {
                name: 'Muthu Logistics',
                transporterType: 'Market'
            }
        }
    }
}
const mockShortageQuantityData = {
    overallTripId: 1,
    shortageQuantity: 500,
    shortageAmount: 4000,
    approvalStatus: true,
    reason: 'ABC',
    filledLoad: 40000,
    unloadedQuantity: 39500
}
const mockGstDuesData = [
    {
        name: 'Muthu Logistics',
        type: 'gst pay',
        dueDate: 1707244200,
        payableAmount: 3600,
        overallTripId: 1,
        vehicleNumber: 'TN93D5512'
    }
]
describe('Acknowledgement Controller', () => {
    test('should able to get all vehicle number from overAllTrip', async () => {
        mockGetAllActivetripTripByTripStatus.mockResolvedValue(mockOverAllTrip)
        await supertest(app).get('/api/acknowledgement/tripstatus').expect(200)
        expect(mockGetAllActivetripTripByTripStatus).toBeCalledTimes(1)
    })
    test('should able to get all vehicle number from overAllTrip', async () => {
        mockGetAllTripByAcknowledgementStatus.mockResolvedValue(mockOverAllTrip)
        await supertest(app).get('/api/acknowledgement/acknowlegementstatus').expect(200)
        expect(mockGetAllTripByAcknowledgementStatus).toBeCalledTimes(1)
    })
    test('should able to get trip Details from overAllTrip by Id', async () => {
        mockOverAllTripById.mockResolvedValue(mockOverAllTripByStockIdData)
        await supertest(app).get('/api/acknowledgement/:id').expect(mockOverAllTripByStockIdData)
        expect(mockOverAllTripById).toBeCalledTimes(1)
    })
    test('should able to close trip by Id for stockTrip', async () => {
        mockOverAllTripById.mockResolvedValue(mockOverAllTripByStockIdData)
        mockGetPercentageByTransporter.mockResolvedValue(mockPercentageByTransporterData)
        mockCreateShortageQuantity.mockResolvedValue(mockShortageQuantityData)
        mockUpdateWeightForStockTrip.mockResolvedValue(mockUpdateData)
        mockupdateUnloadingKilometer.mockResolvedValue(mockUnloadingKilometer)
        mockUpdateWeightForTrip.mockResolvedValue(mockUpdateData)
        mockcreatePaymentDues.mockResolvedValue(mockGstDuesData)
        await supertest(app).put('/api/acknowledgement/trip').expect(200)
        expect(mockOverAllTripById).toBeCalledTimes(2)
        expect(mockupdateUnloadingKilometer).toBeCalledTimes(1)
        expect(mockUpdateWeightForStockTrip).toBeCalledTimes(1)
        expect(mockUpdateWeightForTrip).toBeCalledTimes(0)
    })
    test('should able to close trip by Id for trip', async () => {
        mockOverAllTripById.mockResolvedValue(mockOverAllTripByTripIdData)
        await supertest(app).put('/api/acknowledgement/trip').expect(200)
        expect(mockOverAllTripById).toBeCalledTimes(3)
        expect(mockUpdateWeightForStockTrip).toBeCalledTimes(1)
        expect(mockUpdateWeightForTrip).toBeCalledTimes(1)
    })
    test('should able update acknowledgement status with create final due', async () => {
        mockAcknowledgeStatusforOverAllTrip.mockResolvedValue(mockAcknowledgeStatusforAllTrip)
        await supertest(app).put('/api/acknowledge/12').expect(200)
        expect(mockAcknowledgeStatusforOverAllTrip).toBeCalledTimes(1)
    })
    test('should have super admin role for stockTrip', async () => {
        mockOverAllTripById.mockResolvedValue(mockOverAllTripByTripIdData)
        await supertest(app).put('/api/acknowledgement/trip').expect(200)
        expect(mockAuth).toBeCalledWith(['Admin'])
    })
})
