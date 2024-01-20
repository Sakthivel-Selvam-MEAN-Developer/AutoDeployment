import supertest from 'supertest'
import { app } from '../../app.ts'

const mockAllTripByAcknowledgementStatus = vi.fn()
const mockOverAllTripById = vi.fn()
const mockcloseStockTrip = vi.fn()
const mockcloseTrip = vi.fn()

vi.mock('../models/overallTrip', () => ({
    getOverAllTripByAcknowledgementStatus: () => mockAllTripByAcknowledgementStatus(),
    getOverAllTripById: (inputs: any) => mockOverAllTripById(inputs)
}))
vi.mock('../models/closeStockTrip', () => ({
    closeStockTrip: (inputs: any) => mockcloseStockTrip(inputs)
}))
vi.mock('../models/loadingToUnloadingTrip', () => ({
    closeTrip: (inputs: any) => mockcloseTrip(inputs)
}))

const mockOverAllTrip = [
    {
        id: 1,
        acknowledgementStatus: false,
        loadingPointToStockPointTrip: null,
        loadingPointToUnloadingPointTrip: {
            id: 1,
            truck: {
                vehicleNumber: 'TN93D5512'
            }
        }
    }
]
const mockCloseTripData = {
    id: 1,
    tripStatus: false
}

describe('Acknowledgement Controller', () => {
    test('should able to get all vehicle number from overAllTrip', async () => {
        mockAllTripByAcknowledgementStatus.mockResolvedValue(mockOverAllTrip)
        await supertest(app).get('/acknowledgement').expect(200)
        expect(mockAllTripByAcknowledgementStatus).toBeCalledTimes(1)
    })
    test('should able to get trip Details from overAllTrip by Id ', async () => {
        mockOverAllTripById.mockResolvedValue({
            id: 1,
            acknowledgementStatus: false,
            loadingPointToStockPointTrip: null,
            loadingPointToUnloadingPointTrip: {
                id: 1,
                truck: {
                    vehicleNumber: 'TN93D5512'
                }
            }
        })
        await supertest(app)
            .get('/acknowledgement/:id')
            .expect({
                id: 1,
                acknowledgementStatus: false,
                loadingPointToStockPointTrip: null,
                loadingPointToUnloadingPointTrip: {
                    id: 1,
                    truck: {
                        vehicleNumber: 'TN93D5512'
                    }
                }
            })
        expect(mockOverAllTripById).toBeCalledTimes(1)
    })
    test.skip('should able to close trip by Id ', async () => {
        mockOverAllTripById.mockResolvedValue(mockCloseTripData)
        await supertest(app).put('/acknowledgement/trip').expect(mockCloseTripData)
        expect(mockcloseTrip).toBeCalledTimes(1)
    })
})
