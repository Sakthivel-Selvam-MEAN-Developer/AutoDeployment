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
        const id = 1

        const actual = await tripLogic(data, fuelDetails, transporterName, id)
        expect(actual).toEqual([
            {
                name: 'Barath Logistics Pvt Ltd',
                type: 'initial pay',
                dueDate: dayjs().subtract(1, 'day').startOf('day').unix(),
                tripId: 1,
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
        const id = 1

        const actual = await tripLogic(data, fuelDetails, transporterName, id)
        expect(actual).toEqual([
            {
                name: 'Barath Logistics Pvt Ltd',
                type: 'initial pay',
                dueDate: dayjs().startOf('day').unix(),
                tripId: 1,
                payableAmount: 6000
            },
            {
                name: 'Barath Petroleum',
                type: 'fuel pay',
                dueDate: dayjs().startOf('day').unix(),
                tripId: 1,
                payableAmount: 1000
            }
        ])
    })
})
