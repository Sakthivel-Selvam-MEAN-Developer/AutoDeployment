import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { createDriverAdvance, getDriverAdvance } from './driverAdvance'
import { create as createDriverTrip } from './driverTrip'
import { create as createDriver } from './driver.ts'
import prisma from '../../../prisma'
import { seedDriverTrip } from '../seed/driverTrip'
import seedDriver from '../seed/driver.ts'

dayjs.extend(utc)
const driverAdvanceData = {
    amount: 5000,
    driverTripId: 1,
    advanceDate: dayjs.utc().startOf('day').unix()
}
describe('Driver Advance model', () => {
    test('should able to create', async () => {
        let driver: { id: number } | undefined = { id: 1 }
        await prisma().$transaction(async (prismas) => {
            driver = await createDriver(seedDriver, prismas)
        })
        const driverTrip = await createDriverTrip({
            ...seedDriverTrip,
            driverId: driver.id,
            unloadingTripSalaryId: 1
        })
        const advance = await createDriverAdvance({
            ...driverAdvanceData,
            driverTripId: driverTrip.id
        })
        const actual = await getDriverAdvance(advance.id)
        expect(actual?.amount).toBe(driverAdvanceData.amount)
    })
})
