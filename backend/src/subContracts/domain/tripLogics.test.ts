import dayjs from 'dayjs'
import tripLogic from './tripLogics.ts'

const tripData = {
    totalTransporterAmount: 10000,
    wantFuel: false,
    truck: {
        vehicleNumber: 'TN93D5512',
        transporter: {
            name: 'Barath Logistics Pvt Ltd',
            transporterType: 'Market'
        }
    }
}
const overallTrip = {
    id: 1,
    truck: {
        vehicleNumber: 'TN93D5512',
        transporter: {
            name: 'Barath Logistics Pvt Ltd',
            transporterType: 'Market'
        }
    },
    fuel: [
        {
            totalprice: 1000,
            fuelStation: {
                bunk: {
                    bunkName: 'Barath Petroleum'
                }
            }
        }
    ]
}
const pricePoint = {
    freightAmount: 1000,
    transporterAmount: 900,
    transporterPercentage: 10,
    payGeneratingDuration: 1,
    transporterAdvancePercentage: 70
}
describe('Trip Logics Test', async () => {
    test('Should get only initial pay without fuel in trip', async () => {
        const actual = await tripLogic(tripData, { ...overallTrip, fuel: [] }, pricePoint)
        expect(actual).toEqual([
            {
                name: 'Barath Logistics Pvt Ltd',
                type: 'initial pay',
                dueDate: dayjs().subtract(1, 'day').startOf('day').unix(),
                overallTripId: 1,
                vehicleNumber: 'TN93D5512',
                payableAmount: 7000,
                transactionId: '',
                NEFTStatus: false,
                paidAt: 0
            }
        ])
    })
    test('Should get both initial with fuel in trip', async () => {
        const actual = await tripLogic(tripData, overallTrip, pricePoint)
        expect(actual).toEqual([
            {
                name: 'Barath Logistics Pvt Ltd',
                type: 'initial pay',
                dueDate: dayjs().subtract(1, 'day').startOf('day').unix(),
                overallTripId: 1,
                vehicleNumber: 'TN93D5512',
                payableAmount: 6000,
                transactionId: '',
                NEFTStatus: false,
                paidAt: 0
            }
        ])
    })
    test('Should get get full transporterAmount as initial pay for transporterAdvancePercentage is 100%', async () => {
        const actual = await tripLogic(tripData, overallTrip, {
            ...pricePoint,
            transporterAdvancePercentage: 100
        })
        expect(actual).toEqual([
            {
                name: 'Barath Logistics Pvt Ltd',
                type: 'initial pay',
                dueDate: dayjs().subtract(1, 'day').startOf('day').unix(),
                overallTripId: 1,
                vehicleNumber: 'TN93D5512',
                payableAmount: 9000,
                transactionId: '',
                NEFTStatus: false,
                paidAt: 0
            }
        ])
    })
})
describe('Trip Logics Test', () => {
    test('Should return undefined when transporterType is Own', async () => {
        const ownTransporterTrip = {
            ...overallTrip,
            truck: {
                ...overallTrip.truck,
                transporter: {
                    ...overallTrip.truck.transporter,
                    transporterType: 'Own'
                }
            }
        }
        const actual = await tripLogic(tripData, ownTransporterTrip, pricePoint)
        expect(actual).toBeUndefined()
    })

    test('Should return undefined when wantFuel is true and fuelDetails is null', async () => {
        const wantFuelTripData = {
            ...tripData,
            wantFuel: true
        }
        const actual = await tripLogic(
            wantFuelTripData,
            { ...overallTrip, fuel: [null] },
            pricePoint
        )
        expect(actual).toBeUndefined()
    })

    test('Should get only initial pay without fuel in trip', async () => {
        const actual = await tripLogic(tripData, { ...overallTrip, fuel: [] }, pricePoint)
        expect(actual).toEqual([
            {
                name: 'Barath Logistics Pvt Ltd',
                type: 'initial pay',
                dueDate: dayjs().subtract(1, 'day').startOf('day').unix(),
                overallTripId: 1,
                vehicleNumber: 'TN93D5512',
                payableAmount: 7000,
                transactionId: '',
                NEFTStatus: false,
                paidAt: 0
            }
        ])
    })

    test('Should get both initial with fuel in trip', async () => {
        const actual = await tripLogic(tripData, overallTrip, pricePoint)
        expect(actual).toEqual([
            {
                name: 'Barath Logistics Pvt Ltd',
                type: 'initial pay',
                dueDate: dayjs().subtract(1, 'day').startOf('day').unix(),
                overallTripId: 1,
                vehicleNumber: 'TN93D5512',
                payableAmount: 6000,
                transactionId: '',
                NEFTStatus: false,
                paidAt: 0
            }
        ])
    })

    test('Should set transactionId to "0" when payableAmount is less than 0', async () => {
        const tripDetails = { ...tripData, totalTransporterAmount: 500 }
        const overallTripWithHighFuelCost = {
            ...overallTrip,
            fuel: [
                {
                    totalprice: 1000,
                    fuelStation: {
                        bunk: {
                            bunkName: 'Barath Petroleum'
                        }
                    }
                }
            ]
        }
        const actual = await tripLogic(tripDetails, overallTripWithHighFuelCost, pricePoint)
        expect(actual).toEqual([
            {
                name: 'Barath Logistics Pvt Ltd',
                type: 'initial pay',
                dueDate: dayjs().subtract(1, 'day').startOf('day').unix(),
                overallTripId: 1,
                vehicleNumber: 'TN93D5512',
                payableAmount: -650,
                transactionId: '0',
                NEFTStatus: true,
                paidAt: 0
            }
        ])
    })
})
