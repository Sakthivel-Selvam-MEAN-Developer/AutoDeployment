import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'

export const create = (
    data:
        | Prisma.stockPointToUnloadingPointTripCreateInput
        | Prisma.stockPointToUnloadingPointTripUncheckedCreateInput
) => prisma.stockPointToUnloadingPointTrip.create({ data })

export const getAllStockToUnloadingPointTrip = () =>
    prisma.stockPointToUnloadingPointTrip.findMany({})

export const closeUnloadingTrip = (id: number) =>
    prisma.stockPointToUnloadingPointTrip.update({
        where: {
            id
        },
        data: {
            tripStatus: true
        }
    })
export const updateUnloadWeightForStockTrip = (id: number, unloadedWeight: number) =>
    prisma.stockPointToUnloadingPointTrip.update({
        where: {
            id
        },
        data: {
            unloadedWeight
        }
    })
