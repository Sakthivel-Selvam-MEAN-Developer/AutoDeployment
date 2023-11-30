import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'

export const create = (data: Prisma.deliveryPointCreateInput) =>
    prisma.deliveryPoint.create({ data })

export const getAllDeliveryPoint = () => prisma.deliveryPoint.findMany({})
