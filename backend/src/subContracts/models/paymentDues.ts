import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'

export const create = (
    data: Prisma.paymentDuesCreateInput | Prisma.paymentDuesUncheckedCreateInput
) => prisma.paymentDues.create({ data })

export const getOnlyActiveDuesByName = () =>
    prisma.paymentDues.groupBy({
        by: ['name'],
        where: {
            status: false,
            type: 'initial pay'
        },
        _count: {
            tripId: true
        },
        _sum: {
            payableAmount: true
        }
    })

export const findTripWithActiveDues = (name: string) =>
    prisma.paymentDues.findMany({
        where: {
            name,
            status: false
        },
        select: {
            payableAmount: true,
            tripId: true,
            type: true
        }
    })
