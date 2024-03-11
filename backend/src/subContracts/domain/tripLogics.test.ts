import dayjs from 'dayjs'
import tripLogic from './tripLogics.ts'

describe('Trip Logics Test', async () => {
    test('Should get only initial pay without fuel after trip', async () => {
        const data = {
            wantFuel: false,
            totalTransporterAmount: 10000
        }
        const fuelDetails = null
        const transporterName = 'Barath Logistics Pvt Ltd'
        const vehicleNumber = 'TN93D5512'
        const id = 1

        const actual = await tripLogic(data, fuelDetails, transporterName, id, vehicleNumber)
        expect(actual).toEqual([
            {
                name: 'Barath Logistics Pvt Ltd',
                type: 'initial pay',
                dueDate: dayjs().startOf('day').unix(),
                overallTripId: 1,
                vehicleNumber: 'TN93D5512',
                payableAmount: 7000
            }
        ])
    })
    test('Should get both initial & fuel pay with fuel before trip', async () => {
        const data = {
            wantFuel: false,
            totalTransporterAmount: 10000
        }
        const fuelDetails = {
            totalprice: 1000,
            fuelStation: {
                bunk: {
                    bunkName: 'Barath Petroleum'
                }
            }
        }
        const transporterName = 'Barath Logistics Pvt Ltd'
        const vehicleNumber = 'TN93D5512'
        const id = 1

        const actual = await tripLogic(data, fuelDetails, transporterName, id, vehicleNumber)
        expect(actual).toEqual([
            {
                name: 'Barath Logistics Pvt Ltd',
                type: 'initial pay',
                dueDate: dayjs().startOf('day').unix(),
                overallTripId: 1,
                vehicleNumber: 'TN93D5512',
                payableAmount: 6000
            }
        ])
    })
})
