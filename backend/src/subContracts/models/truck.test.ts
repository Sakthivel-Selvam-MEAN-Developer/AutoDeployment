import seedTruck from '../seed/truck.ts'
import seedBank from '../seed/bankDetails.ts'
import seedTruckWithoutDep from '../seed/truckWithoutDeb.ts'
import seedTransporter from '../seed/transporterWithoutDep.ts'
import { create as createTruck, getAllTruck, getTruckByTransporter } from './truck.ts'
import { create } from './transporter.ts'
import { create as createBank } from './bankDetails.ts'

describe('Truck model', () => {
    test('should able to create', async () => {
        await createTruck(seedTruck)
        const actual = await getAllTruck()
        expect(actual.length).toBe(1)
        expect(actual[0].vehicleNumber).toBe(seedTruck.vehicleNumber)
    })
    test('should get only Truck by Transporter name', async () => {
        const bank = await createBank(seedBank)
        const transporter = await create({ ...seedTransporter, bankDetailsId: bank.id })
        await createTruck({
            ...seedTruckWithoutDep,
            vehicleNumber: 'TN33ba1234',
            transporterId: transporter.id
        })
        const actual = await getTruckByTransporter(transporter.name)
        expect(actual.length).toBe(1)
        expect(actual[0].transporterId).toBe(transporter.id)
    })
})
