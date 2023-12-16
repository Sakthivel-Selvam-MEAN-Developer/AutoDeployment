import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'

export const create = (
    data: Prisma.unloadingPointCreateInput | Prisma.unloadingPointUncheckedCreateInput
) => prisma.unloadingPoint.create({ data })

export const getAllUnloadingPoint = () => prisma.unloadingPoint.findMany({})

export const getUnloadingPointByCompany = (companyName: string) =>
    prisma.unloadingPoint.findMany({
        where: {
            cementCompany: {
                name: companyName
            }
        }
    })
