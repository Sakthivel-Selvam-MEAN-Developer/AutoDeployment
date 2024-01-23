import supertest from 'supertest'
import { app } from '../../app.ts'

const mockAllTripByAcknowledgementStatus = vi.fn()
const mockOverAllTripById = vi.fn()
const mockcloseStockTrip = vi.fn()
const mockcloseTrip = vi.fn()
const mockUpdateWeightForStockTrip = vi.fn()
const mockUpdateWeightForTrip = vi.fn()

vi.mock('../models/overallTrip', () => ({
    getOverAllTripByAcknowledgementStatus: () => mockAllTripByAcknowledgementStatus(),
    getOverAllTripById: (inputs: any) => mockOverAllTripById(inputs)
}))
vi.mock('../models/loadingToUnloadingTrip', () => ({
    closeTrip: (id: number) => mockcloseStockTrip(id),
    updateUnloadWeightforTrip: (inputs: any, data: any) =>
        mockUpdateWeightForStockTrip(inputs, data)
}))
vi.mock('../models/stockPointToUnloadingPoint', () => ({
    closeUnloadingTrip: (id: number) => mockcloseTrip(id),
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
const mockOverAllTripByIdData = {
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
const mockCloseTripData = {
    id: 1
}
const mockUpdateData = {
    id: 1,
    unloadedWeight: 100
}
describe('Acknowledgement Controller', () => {
    test('should able to get all vehicle number from overAllTrip', async () => {
        mockAllTripByAcknowledgementStatus.mockResolvedValue(mockOverAllTrip)
        await supertest(app).get('/api/acknowledgement').expect(200)
        expect(mockAllTripByAcknowledgementStatus).toBeCalledTimes(1)
    })
    test('should able to get trip Details from overAllTrip by Id', async () => {
        mockOverAllTripById.mockResolvedValue(mockOverAllTripByIdData)
        await supertest(app).get('/api/acknowledgement/:id').expect(mockOverAllTripByIdData)
        expect(mockOverAllTripById).toBeCalledTimes(1)
    })
    test('should able to close trip by Id', async () => {
        mockOverAllTripById.mockResolvedValue(mockOverAllTripByIdData)
        mockcloseStockTrip.mockResolvedValue(mockCloseTripData)
        mockUpdateWeightForStockTrip.mockResolvedValue(mockUpdateData)
        mockcloseTrip.mockResolvedValue(mockCloseTripData)
        mockUpdateWeightForTrip.mockResolvedValue(mockUpdateData)
        await supertest(app).put('/api/acknowledgement/trip').expect(200)
        expect(mockOverAllTripById).toBeCalledTimes(2)
        expect(mockcloseStockTrip).toBeCalledTimes(1)
        expect(mockUpdateWeightForStockTrip).toBeCalledTimes(1)
        expect(mockcloseTrip).toBeCalledTimes(0)
        expect(mockUpdateWeightForTrip).toBeCalledTimes(0)
    })
})
