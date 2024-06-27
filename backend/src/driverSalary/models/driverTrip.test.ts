import { seedDriverTrip } from '../seed/driverTrip.ts'
import {
    create,
    getAllDriverTripById,
    getDriverAdvance,
    getDriverIdByTripId,
    getExpensesByTripIds
} from './driverTrip.ts'
import seedDriver from '../seed/driver.ts'
import { create as createDriver } from './driver.ts'
import prisma from '../../../prisma/index.ts'
import { seedExpenses } from '../seed/expenses.ts'
import { seedDriverAdvance } from '../seed/driverAdvance.ts'

describe('Driver model', () => {
    test('should able to create and get All Driver Trip By Id without startDate', async () => {
        let driver: { id: number } | undefined = { id: 1 }
        await prisma.$transaction(async (prismas) => {
            driver = await createDriver(seedDriver, prismas)
        })
        const driverTrip = await create({
            ...seedDriverTrip,
            driverId: driver.id,
            unloadingTripSalaryId: 1
        })
        const actual = await getAllDriverTripById(driverTrip.id, undefined)
        expect(actual[0].tripId).toBe(driverTrip.id)
    })
    test('should able to create and get All Driver Trip By Idn with startDate', async () => {
        let driver: { id: number } | undefined = { id: 1 }
        await prisma.$transaction(async (prismas) => {
            driver = await createDriver(seedDriver, prismas)
        })
        const driverTrip = await create({
            ...seedDriverTrip,
            driverId: driver.id,
            unloadingTripSalaryId: 1
        })
        const actual = await getAllDriverTripById(
            driverTrip.id,
            JSON.stringify(seedDriverTrip.tripStartDate)
        )
        expect(actual[0].tripId).toBe(driverTrip.id)
    })
    test('should able to get driver id by trip id', async () => {
        let driver: { id: number } | undefined = { id: 1 }
        await prisma.$transaction(async (prismas) => {
            driver = await createDriver(seedDriver, prismas)
        })
        const driverTrip = await create({
            ...seedDriverTrip,
            driverId: driver.id,
            unloadingTripSalaryId: 1
        })
        const actual = await getDriverIdByTripId(driverTrip.tripId)
        expect(actual?.driverId).toBe(driver.id)
    })
    test('should able to get driver advance by trip id', async () => {
        let driver: { id: number } | undefined = { id: 1 }
        await prisma.$transaction(async (prismas) => {
            driver = await createDriver(seedDriver, prismas)
        })
        const driverTrip = await create({
            ...seedDriverTrip,
            driverId: driver.id,
            unloadingTripSalaryId: 1
        })
        await prisma.driverAdvance.create({
            data: {
                ...seedDriverAdvance,
                driverTripId: driverTrip.id
            }
        })
        const actual = await getDriverAdvance(driverTrip.tripId)
        expect(actual[0].driver.name).toBe(seedDriver.name)
        expect(actual[0].driverAdvanceForTrip[0].amount).toBe(seedDriverAdvance.amount)
    })

    test('should able to get expenses by trip id', async () => {
        let driver: { id: number } | undefined = { id: 1 }
        await prisma.$transaction(async (prismas) => {
            driver = await createDriver(seedDriver, prismas)
        })
        const driverTrip = await create({
            ...seedDriverTrip,
            driverId: driver.id,
            unloadingTripSalaryId: 1
        })
        await prisma.expenses.create({
            data: {
                ...seedExpenses,
                acceptedAmount: 100
            }
        })
        const actual = await getExpensesByTripIds(driverTrip.tripId)
        expect(actual[0].acceptedAmount).toBe(100)
    })
})
