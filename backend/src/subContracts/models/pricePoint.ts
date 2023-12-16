import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'

export const create = (
    data: Prisma.pricePointCreateInput | Prisma.pricePointUncheckedCreateInput
) => prisma.pricePoint.create({ data })

export const getPricePoint = (loadingPointId: any, unloadingPointId: any) =>
    prisma.pricePoint.findFirst({
        where: {
            loadingPointId,
            unloadingPointId
        },
        select: {
            freightAmount: true,
            transporterAmount: true
        }
    })
