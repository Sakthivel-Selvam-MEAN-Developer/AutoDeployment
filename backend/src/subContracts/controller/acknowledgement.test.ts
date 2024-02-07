import supertest from 'supertest'
import { Prisma } from '@prisma/client'
import { app } from '../../app.ts'

const mockAllTripByAcknowledgementStatus = vi.fn()
const mockOverAllTripById = vi.fn()
const mockUpdateWeightForStockTrip = vi.fn()
const mockUpdateWeightForTrip = vi.fn()
const mockAcknowledgeStatusforOverAllTrip = vi.fn()
const mockCreateShortageQuantity = vi.fn()
const mockGetPercentageByTransporter = vi.fn()
const mockcreatePaymentDues = vi.fn()

vi.mock('../models/overallTrip', () => ({
    getOverAllTripByAcknowledgementStatus: () => mockAllTripByAcknowledgementStatus(),
    getOverAllTripById: (inputs: any) => mockOverAllTripById(inputs),
    closeAcknowledgementStatusforOverAllTrip: (inputs: any) =>
        mockAcknowledgeStatusforOverAllTrip(inputs)
}))
vi.mock('../models/loadingToUnloadingTrip', () => ({
    updateUnloadWeightforTrip: (inputs: any, data: any) =>
        mockUpdateWeightForStockTrip(inputs, data)
}))
vi.mock('../models/stockPointToUnloadingPoint', () => ({
    updateUnloadWeightForStockTrip: (inputs: any, data: any) =>
        mockUpdateWeightForTrip(inputs, data)
}))
vi.mock('../models/shortageQuantity', () => ({
    create: (inputs: any) => mockCreateShortageQuantity(inputs)
}))
vi.mock('../models/transporter', () => ({
    getPercentageByTransporter: (name: any) => mockGetPercentageByTransporter(name)
}))
vi.mock('../models/paymentDues', () => ({
    create: (intputs: Prisma.paymentDuesCreateInput) => mockcreatePaymentDues(intputs)
}))

const mockOverAllTrip = [
    {
        id: 1,
        acknowledgementStatus: false,
        stockPointToUnloadingPointTripId: null,
        loadingPointToUnloadingPointTripId: 1,
        loadingPointToStockPointTrip: null,
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
    loadingPointToStockPointTrip: {
        id: 1,
        truck: {
            vehicleNumber: 'TN93D5512',
            transporter: {
                name: 'Muthu Logistics'
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
                    name: 'Muthu Logistics'
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
const mockPercentageByTransporterData = {
    gstPercentage: 10
}
const mockAcknowledgeStatusforAllTrip = {
    id: 12,
    acknowledgementStatus: false,
    loadingPointToStockPointTrip: null,
    stockPointToUnloadingPointTrip: null,
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
        wantFuel: false,
        truck: {
            vehicleNumber: 'TN30S7777',
            transporter: {
                name: 'Muthu Logistics'
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
        mockAllTripByAcknowledgementStatus.mockResolvedValue(mockOverAllTrip)
        await supertest(app).get('/api/acknowledgement').expect(200)
        expect(mockAllTripByAcknowledgementStatus).toBeCalledTimes(1)
    })
    test('should able to get trip Details from overAllTrip by Id', async () => {
        mockOverAllTripById.mockResolvedValue(mockOverAllTripByStockIdData)
        await supertest(app).get('/api/acknowledgement/:id').expect(mockOverAllTripByStockIdData)
        expect(mockOverAllTripById).toBeCalledTimes(1)
    })
    test.skip('should able update acknowledgement status with create final due', async () => {
        mockAcknowledgeStatusforOverAllTrip.mockResolvedValue(mockAcknowledgeStatusforAllTrip)
    })
    test('should able to close trip by Id for stockTrip', async () => {
        mockOverAllTripById.mockResolvedValue(mockOverAllTripByStockIdData)
        mockGetPercentageByTransporter.mockResolvedValue(mockPercentageByTransporterData)
        mockCreateShortageQuantity.mockResolvedValue(mockShortageQuantityData)
        mockUpdateWeightForStockTrip.mockResolvedValue(mockUpdateData)
        mockUpdateWeightForTrip.mockResolvedValue(mockUpdateData)
        mockcreatePaymentDues.mockResolvedValue(mockGstDuesData)
        await supertest(app).put('/api/acknowledgement/trip').expect(200)
        expect(mockOverAllTripById).toBeCalledTimes(2)
        expect(mockUpdateWeightForStockTrip).toBeCalledTimes(1)
        expect(mockUpdateWeightForTrip).toBeCalledTimes(0)
    })
    test('should able to close trip by Id for trip', async () => {
        mockOverAllTripById.mockResolvedValue(mockOverAllTripByTripIdData)
        mockUpdateWeightForStockTrip.mockResolvedValue(mockUpdateData)
        mockUpdateWeightForTrip.mockResolvedValue(mockUpdateData)
        mockCreateShortageQuantity.mockResolvedValue(mockShortageQuantityData)
        await supertest(app).put('/api/acknowledgement/trip').expect(200)
        expect(mockOverAllTripById).toBeCalledTimes(3)
        expect(mockUpdateWeightForStockTrip).toBeCalledTimes(1)
        expect(mockUpdateWeightForTrip).toBeCalledTimes(1)
    })
})
