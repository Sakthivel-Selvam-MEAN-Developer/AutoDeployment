import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'

export const create = (
    data: Prisma.shortageQuantityCreateInput | Prisma.shortageQuantityUncheckedCreateInput
) => prisma.shortageQuantity.create({ data })

export const getShortageQuantityByOverallTripId = (overallTripId: number) =>
    prisma.shortageQuantity.findFirst({
        where: {
            overallTripId
        }
    })
