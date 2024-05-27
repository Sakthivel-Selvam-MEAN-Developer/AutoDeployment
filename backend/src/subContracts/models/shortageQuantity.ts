import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'

export const create = (
    data: Prisma.shortageQuantityCreateInput | Prisma.shortageQuantityUncheckedCreateInput
) => prisma.shortageQuantity.create({ data })

export const getShortageQuantityByOverallTripId = (overallTripId: number) =>
    prisma.shortageQuantity.findFirst({
        where: { overallTripId },
        select: { shortageAmount: true, unloadedQuantity: true, filledLoad: true }
    })
interface shortageProps {
    unloadedQuantity: number
    shortageQuantity: number
    shortageAmount: number
}
export const updateShortageInOverallTrip = (id: number, newShortage: shortageProps) =>
    prisma.shortageQuantity.update({
        where: { id },
        data: {
            unloadedQuantity: newShortage.unloadedQuantity,
            shortageQuantity: newShortage.shortageQuantity,
            shortageAmount: newShortage.shortageAmount
        }
    })
