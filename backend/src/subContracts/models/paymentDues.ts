import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'

export const create = (data: Prisma.paymentDuesCreateManyInput) =>
    prisma.paymentDues.createMany({ data })

export const getOnlyActiveDuesByName = (dueDate: number, type: string) =>
    prisma.paymentDues.groupBy({
        by: ['name'],
        where: {
            status: false,
            type,
            dueDate: {
                lte: dueDate
            }
        },
        _count: {
            tripId: true
        },
        _sum: {
            payableAmount: true
        }
    })

export const findTripWithActiveDues = (dueDate: number, type: string) =>
    prisma.paymentDues.findMany({
        where: {
            status: false,
            type,
            dueDate: {
                lte: dueDate
            }
        },
        select: {
            id: true,
            payableAmount: true,
            tripId: true,
            type: true,
            name: true
        }
    })

export const updatePaymentDues = (data: any) =>
    prisma.paymentDues.update({
        where: {
            id: data.id
        },
        data: {
            transactionId: data.transactionId,
            status: true,
            paidAt: data.paidAt
        }
    })
