import dayjs from 'dayjs'
import { Response } from 'express'
import { loadingToUnloadingTripLogic } from './createLoadingToUnloadingTripEvent.ts'

const mockTripDetails = {
    id: 1,
    truckId: 1,
    loadingPointId: 1,
    unloadingPointId: 1,
    startDate: 1703679340,
    filledLoad: 48,
    invoiceNumber: 'AGTH5312WE',
    freightAmount: 1000,
    transporterAmount: 900,
    totalFreightAmount: 48000,
    totalTransporterAmount: 43200,
    margin: 4800,
    wantFuel: false,
    truck: {
        vehicleNumber: 'TN93D5512',
        transporter: {
            name: 'Barath Logistics Pvt Ltd',
            transporterType: 'Market Transporter'
        }
    },
    loadingPoint: {
        cementCompany: { advanceType: 70 }
    }
}
const mockReq = {
    truckId: 2,
    loadingPointId: 1,
    startDate: 1717525800,
    filledLoad: 56,
    invoiceNumber: 'zaxc',
    loadingKilometer: 0,
    freightAmount: 1000,
    transporterAmount: 900,
    totalFreightAmount: 56000,
    totalTransporterAmount: 50400,
    margin: 3920,
    wantFuel: false,
    partyName: 'zxczx',
    lrNumber: 'zxczxc',
    stockPointId: 1
}
const mockRes = {
    sendStatus: vi.fn().mockReturnThis(),
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis()
} as unknown as Response

const mockResponse = [
    {
        name: 'Barath Logistics Pvt Ltd',
        type: 'initial pay',
        dueDate: dayjs().subtract(1, 'day').startOf('day').unix(),
        overallTripId: 1,
        vehicleNumber: 'TN93D5512',
        payableAmount: 35280,
        NEFTStatus: false,
        transactionId: '',
        paidAt: 0
    }
]
const mockFuelDetails = {
    id: 1,
    fueledDate: 1718908200,
    invoiceNumber: 'axsdcrtysdfcu',
    pricePerliter: 100,
    quantity: 120,
    totalprice: 12000,
    dieselkilometer: 0,
    fuelType: '',
    paymentStatus: false,
    vehicleNumber: 'TN29B3246',
    bunkId: 2,
    overallTripId: null,
    bunk: { bunkName: 'Sakthivel Barath Petroleum' }
}
describe('For an overall trip when trip is created for market vehicle', () => {
    test('when loadingtostock trip is created initial pay should be generated', async () => {
        const actual = await loadingToUnloadingTripLogic(
            mockTripDetails.truck.transporter.transporterType,
            mockReq,
            null,
            mockTripDetails.truck.transporter.name,
            mockTripDetails.id,
            mockTripDetails.truck.vehicleNumber,
            'LoadingToStock',
            mockTripDetails.loadingPoint.cementCompany.advanceType,
            mockRes
        )
        expect(actual).toEqual(mockResponse)
    })
    test('when loadingtostock trip is created and before fueled initial pay should be generated after subtract the fuel amount', async () => {
        const req = { ...mockReq, body: { ...mockReq, wantFuel: true } }
        const actual = await loadingToUnloadingTripLogic(
            mockTripDetails.truck.transporter.transporterType,
            req,
            mockFuelDetails,
            mockTripDetails.truck.transporter.name,
            mockTripDetails.id,
            mockTripDetails.truck.vehicleNumber,
            'LoadingToStock',
            mockTripDetails.loadingPoint.cementCompany.advanceType,
            mockRes
        )
        expect(actual).toEqual([{ ...mockResponse[0], payableAmount: 23280 }])
    })
    test('when loadingtostock trip is created and advance type is 100% initialpay should be generated with 100%', async () => {
        const advanceType = 100
        const actual = await loadingToUnloadingTripLogic(
            mockTripDetails.truck.transporter.transporterType,
            mockReq,
            null,
            mockTripDetails.truck.transporter.name,
            mockTripDetails.id,
            mockTripDetails.truck.vehicleNumber,
            'LoadingToStock',
            advanceType,
            mockRes
        )
        expect(actual).toEqual([{ ...mockResponse[0], payableAmount: 50400 }])
    })
    test('when loadingtostock trip is created and advance type is 100% and before fueled initial pay should be generated after subtract the fuel amount from 100%', async () => {
        const advanceType = 100
        const actual = await loadingToUnloadingTripLogic(
            mockTripDetails.truck.transporter.transporterType,
            mockReq,
            mockFuelDetails,
            mockTripDetails.truck.transporter.name,
            mockTripDetails.id,
            mockTripDetails.truck.vehicleNumber,
            'LoadingToStock',
            advanceType,
            mockRes
        )
        expect(actual).toEqual([{ ...mockResponse[0], payableAmount: 38400 }])
    })
})

// For Own Vehicle

describe('For an overall trip when trip is created for Own Vehicle', () => {
    test('when loadingtounloading trip is created and transporter type is own initial pay should not be generated', async () => {
        const transporterType = 'Own'
        const actual = await loadingToUnloadingTripLogic(
            transporterType,
            mockReq,
            null,
            mockTripDetails.truck.transporter.name,
            mockTripDetails.id,
            mockTripDetails.truck.vehicleNumber,
            'LoadingToStock',
            mockTripDetails.loadingPoint.cementCompany.advanceType,
            mockRes
        )
        expect(actual).toEqual(undefined)
    })
})
