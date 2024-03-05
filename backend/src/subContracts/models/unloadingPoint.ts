import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'

export const getAllUnloadingPoint = (id: number) =>
    prisma.unloadingPoint.findMany({
        where: {
            cementCompanyId: id
        }
    })

export const getUnloadingPointByCompany = (companyName: string) =>
    prisma.unloadingPoint.findMany({
        where: {
            cementCompany: {
                name: companyName
            }
        }
    })

export const create = (
    data: Prisma.unloadingPointCreateInput | Prisma.unloadingPointUncheckedCreateInput
) => prisma.unloadingPoint.create({ data })
