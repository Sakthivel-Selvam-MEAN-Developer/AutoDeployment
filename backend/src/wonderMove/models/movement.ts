import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'

export const createMany = (data: Prisma.vehicleMovementsCreateManyInput[]) =>
    prisma().vehicleMovements.createMany({ data })
