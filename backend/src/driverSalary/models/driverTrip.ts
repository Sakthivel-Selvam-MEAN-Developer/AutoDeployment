import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'

export const create = async (
    data: Prisma.driverTripCreateInput | Prisma.driverTripUncheckedCreateInput
) => prisma.driverTrip.create({ data })

export const getAllDriverTripById = (id: number) =>
    prisma.driverTrip.findMany({
        where: { driverId: id },
        select: {
            id: true,
            tripId: true,
            unloadingTripSalaryId: true,
            stockTripSalaryId: true,
            driverAdvance: true
        }
    })

export const getDriverIdByTripId = (id: number) =>
    prisma.driverTrip.findFirst({
        where: { tripId: id },
        select: { id: true, driverId: true }
    })

export const updateDriverTripWithTripSalaryId = (id: number, tripSalaryId: number) =>
    prisma.driverTrip.update({
        where: { id },
        data: { stockTripSalaryId: tripSalaryId }
    })

export const updateDriverAdvanceByTripId = (id: number, driverAdvance: number) =>
    prisma.driverTrip.update({
        where: { id },
        data: {
            driverAdvance: {
                push: driverAdvance
            }
        }
    })
