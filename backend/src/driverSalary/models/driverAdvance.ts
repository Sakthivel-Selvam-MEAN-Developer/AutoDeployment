import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'

export const createDriverAdvance = (
    data: Prisma.driverAdvanceCreateInput | Prisma.driverAdvanceUncheckedCreateInput
) => prisma().driverAdvance.create({ data })

export const getDriverAdvance = (id: number) =>
    prisma().driverAdvance.findFirst({
        where: {
            id
        },
        select: {
            amount: true
        }
    })
