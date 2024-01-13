import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'

export const create = (
    data: Prisma.pricePointMarkerCreateInput | Prisma.pricePointMarkerUncheckedCreateInput
) => prisma.pricePointMarker.create({ data })
