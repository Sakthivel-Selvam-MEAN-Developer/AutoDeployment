import { seedTripSalary } from '../seed/tripSalary.ts'
import {
    createTripSalary as create,
    getTripSalaryDetailsById,
    getTripSalaryDetailsByLoactionId
} from './tripSalary.ts'

describe('Driver Model', () => {
    test('should able to create and get trip salary details', async () => {
        const tripSalaryDetails = await create(seedTripSalary)
        const actual = await getTripSalaryDetailsByLoactionId(
            tripSalaryDetails.loadingPointId?.toString() || '',
            tripSalaryDetails.unloadingPointId?.toString() || '',
            tripSalaryDetails.stockPointId?.toString() || ''
        )
        expect(actual?.tripBetta).toBe(tripSalaryDetails.tripBetta)
        expect(actual?.dailyBetta).toBe(tripSalaryDetails.dailyBetta)
        expect(actual?.driverAdvance).toBe(tripSalaryDetails.driverAdvance)
    })
    test('should able update trip salary details', async () => {
        await create(seedTripSalary)
        const updatedTripSalaryDetails = {
            cementCompanyId: 1,
            loadingPointId: 1,
            stockPointId: null,
            unloadingPointId: 1,
            tripBetta: 10000,
            dailyBetta: 400,
            driverAdvance: 2000
        }
        const actual = await create(updatedTripSalaryDetails)
        expect(actual?.tripBetta).toBe(updatedTripSalaryDetails.tripBetta)
        expect(actual?.dailyBetta).toBe(updatedTripSalaryDetails.dailyBetta)
        expect(actual?.driverAdvance).toBe(updatedTripSalaryDetails.driverAdvance)
    })
    test('should able get trip salary details by id', async () => {
        const createdTripSalaryDetails = await create(seedTripSalary)
        const actual = await getTripSalaryDetailsById([createdTripSalaryDetails.id])
        expect(actual[0].tripBetta).toBe(createdTripSalaryDetails.tripBetta)
        expect(actual[0].driverAdvance).toBe(createdTripSalaryDetails.driverAdvance)
        expect(actual[0].dailyBetta).toBe(createdTripSalaryDetails.dailyBetta)
    })
})
