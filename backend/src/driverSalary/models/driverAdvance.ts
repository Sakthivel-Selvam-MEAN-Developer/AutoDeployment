import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'

export const createDriverAdvance = (
    data: Prisma.driverAdvanceCreateInput | Prisma.driverAdvanceUncheckedCreateInput
) => prisma.driverAdvance.create({ data })
