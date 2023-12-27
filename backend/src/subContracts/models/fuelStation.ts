import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'

export const create = (
    data: Prisma.fuelStationCreateInput | Prisma.fuelStationUncheckedCreateInput
) => prisma.fuelStation.create({ data })

export const getAllFuelStationByBunk = (bunkId: number) =>
    prisma.fuelStation.findMany({
        where: {
            bunkId
        }
    })
