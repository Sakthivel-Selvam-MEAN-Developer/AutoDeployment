import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'

export const create = (
    data: Prisma.driverTripCreateInput | Prisma.driverTripUncheckedCreateInput
) => prisma.driverTrip.create({ data })

export const getAllDriverTripById = (id: number) =>
    prisma.driverTrip.findMany({
        where: {
            driverId: id
        },
        select: {
            id: true
        }
    })
