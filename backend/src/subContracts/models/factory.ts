import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'

export const create = (data: Prisma.factoryCreateInput | Prisma.factoryUncheckedCreateInput) =>
    prisma.factory.create({ data })

export const getAllFactory = () => prisma.factory.findMany({})

export const getFactoryByCompany = (companyName: string) =>
    prisma.factory.findMany({
        where: {
            cementCompany: {
                name: companyName
            }
        }
    })
