import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'

export const create = (
    data: Prisma.deliveryPointCreateInput | Prisma.deliveryPointUncheckedCreateInput
) => prisma.deliveryPoint.create({ data })

export const getAllDeliveryPoint = () => prisma.deliveryPoint.findMany({})

export const getDeliveryPointByCompany = (companyName: string) =>
    prisma.deliveryPoint.findMany({
        where: {
            cementCompany: {
                name: companyName
            }
        }
    })
