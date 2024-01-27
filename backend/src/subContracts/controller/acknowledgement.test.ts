import supertest from 'supertest'
import { app } from '../../app.ts'

const mockAllTripByAcknowledgementStatus = vi.fn()
const mockOverAllTripById = vi.fn()
const mockUpdateWeightForStockTrip = vi.fn()
const mockUpdateWeightForTrip = vi.fn()
const mockAcknowledgeStatusforOverAllTrip = vi.fn()

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
                vehicleNumber: 'TN93D5512'
            },
            loadingPoint: {
                id: 1,
                name: 'Chennai-south'
            },
            unloadingPoint: {
                id: 1,
                name: 'Salem'
            }
        }
    }
]
const mockOverAllTripByStockIdData = {
    id: 1,
    acknowledgementStatus: false,
    stockPointToUnloadingPointTripId: null,
    loadingPointToUnloadingPointTripId: 1,
    loadingPointToStockPointTrip: null,
    loadingPointToUnloadingPointTrip: {
        id: 1,
        truck: {
            vehicleNumber: 'TN93D5512'
        },
        loadingPoint: {
            id: 1,
            name: 'Chennai-south'
        },
        unloadingPoint: {
            id: 1,
            name: 'Salem'
        }
    }
}
const mockOverAllTripByTripIdData = {
    id: 1,
    acknowledgementStatus: false,
    stockPointToUnloadingPointTripId: 1,
    loadingPointToUnloadingPointTripId: null,
    loadingPointToUnloadingPointTrip: null,
    stockPointToUnloadingPointTrip: {
        id: 1,
        truck: {
            vehicleNumber: 'TN93D5512'
        },
        loadingPointToStockPointTrip: {
            id: 1,
            loadingPoint: {
                id: 1,
                name: 'Salem'
            },
            stockPoint: {
                id: 1,
                name: 'Salem'
            }
        },
        unloadingPoint: {
            id: 1,
            name: 'Salem'
        }
    }
}
const mockUpdateData = {
    id: 1,
    unloadedWeight: 100
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
        mockUpdateWeightForStockTrip.mockResolvedValue(mockUpdateData)
        mockUpdateWeightForTrip.mockResolvedValue(mockUpdateData)
        await supertest(app).put('/api/acknowledgement/trip').expect(200)
        expect(mockOverAllTripById).toBeCalledTimes(2)
        expect(mockUpdateWeightForStockTrip).toBeCalledTimes(1)
        expect(mockUpdateWeightForTrip).toBeCalledTimes(0)
    })
    test('should able to close trip by Id for trip', async () => {
        mockOverAllTripById.mockResolvedValue(mockOverAllTripByTripIdData)
        mockUpdateWeightForStockTrip.mockResolvedValue(mockUpdateData)
        mockUpdateWeightForTrip.mockResolvedValue(mockUpdateData)
        await supertest(app).put('/api/acknowledgement/trip').expect(200)
        expect(mockOverAllTripById).toBeCalledTimes(3)
        expect(mockUpdateWeightForStockTrip).toBeCalledTimes(1)
        expect(mockUpdateWeightForTrip).toBeCalledTimes(1)
    })
})
