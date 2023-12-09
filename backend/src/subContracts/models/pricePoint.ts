import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'

export const create = (
    data: Prisma.pricePointCreateInput | Prisma.pricePointUncheckedCreateInput
) => prisma.pricePoint.create({ data })

export const getPricePoint = (factoryId: any, deliveryPointId: any) =>
    prisma.pricePoint.findFirst({
        where: {
            factoryId,
            deliveryPointId
        },
        select: {
            freightAmount: true,
            transporterAmount: true
        }
    })
