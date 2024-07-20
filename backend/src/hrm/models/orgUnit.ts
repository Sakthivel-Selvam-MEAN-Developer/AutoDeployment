import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'

export const create = (data: Prisma.orgUnitsCreateInput | Prisma.orgUnitsUncheckedCreateInput) =>
    prisma().orgUnits.create({ data })

export const listOfOrg = () => prisma().orgUnits.findMany()
