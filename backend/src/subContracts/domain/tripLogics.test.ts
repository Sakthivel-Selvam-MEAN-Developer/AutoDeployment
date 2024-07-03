import dayjs from 'dayjs'
import tripLogic from './tripLogics.ts'

const tripData = {
    totalTransporterAmount: 10000,
    wantFuel: false,
    loadingPoint: {
        cementCompany: {
            advanceType: 70
        }
    },
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
describe('Trip Logics Test', async () => {
    test('Should get only initial pay without fuel in trip', async () => {
        const actual = await tripLogic(tripData, { ...overallTrip, fuel: [] }, 'LoadingToUnloading')
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
        const actual = await tripLogic(tripData, overallTrip, 'LoadingToUnloading')
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
    test('Should get get full transporterAmount as initial pay for advanceType is 100%', async () => {
        const tripDetails = { ...tripData, loadingPoint: { cementCompany: { advanceType: 100 } } }
        const actual = await tripLogic(tripDetails, overallTrip, 'LoadingToStock')
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
