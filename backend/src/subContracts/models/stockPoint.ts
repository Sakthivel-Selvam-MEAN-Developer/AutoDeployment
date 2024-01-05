import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'

export const getAllStockPoint = () => prisma.stockPoint.findMany({})

export const getStockPointByCompany = (companyName: string) =>
    prisma.stockPoint.findMany({
        where: {
            cementCompany: {
                name: companyName
            }
        }
    })

export const create = (
    data: Prisma.stockPointCreateInput | Prisma.stockPointUncheckedCreateInput
) =>
    prisma.stockPoint.upsert({
        where: {
            name: data.name
        },
        create: {
            ...data
        },
        update: {}
    })
