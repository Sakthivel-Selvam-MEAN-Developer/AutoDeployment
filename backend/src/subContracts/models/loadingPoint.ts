import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'

export const getAllLoadingPoint = () => prisma.loadingPoint.findMany({})

export const getLoadingPointByCompany = (companyName: string) =>
    prisma.loadingPoint.findMany({
        where: {
            cementCompany: {
                name: companyName
            }
        }
    })

export const create = (
    data: Prisma.loadingPointCreateInput | Prisma.loadingPointUncheckedCreateInput
) =>
    prisma.loadingPoint.upsert({
        where: {
            name: data.name
        },
        create: {
            ...data
        },
        update: {}
    })
