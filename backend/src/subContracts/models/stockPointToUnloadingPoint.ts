import { Prisma } from '@prisma/client'
import dayjs from 'dayjs'
import prisma from '../../../prisma/index.ts'

export const create = (
    data:
        | Prisma.stockPointToUnloadingPointTripCreateInput
        | Prisma.stockPointToUnloadingPointTripUncheckedCreateInput
) => prisma.stockPointToUnloadingPointTrip.create({ data })

export const getAllStockToUnloadingPointTrip = () =>
    prisma.stockPointToUnloadingPointTrip.findMany({})

export const updateUnloadWeightForStockTrip = (id: number) =>
    prisma.stockPointToUnloadingPointTrip.update({
        where: {
            id
        },
        data: {
            tripStatus: true,
            acknowledgeDueTime: dayjs().add(1, 'minute').unix()
        }
    })
