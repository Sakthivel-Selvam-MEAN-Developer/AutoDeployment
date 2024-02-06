import prisma from '../../../prisma/index.ts'

export const create = (data: any) => prisma.paymentDues.createMany({ data })

export const getOnlyActiveDuesByName = (dueDate: number, status: boolean) =>
    prisma.paymentDues.groupBy({
        by: ['name'],
        where: {
            status: false,
            NEFTStatus: status,
            dueDate: {
                lte: dueDate
            }
        },
        _count: {
            status: true
        },
        _sum: {
            payableAmount: true
        }
    })

export const findTripWithActiveDues = (dueDate: number, status: boolean) =>
    prisma.paymentDues.findMany({
        where: {
            status: false,
            NEFTStatus: status,
            dueDate: {
                lte: dueDate
            }
        },
        select: {
            id: true,
            payableAmount: true,
            overallTripId: true,
            type: true,
            name: true,
            status: true,
            vehicleNumber: true,
            fuelId: true
        }
    })
interface dataProps {
    id: number
    transactionId: string
    paidAt: number
}
export const updatePaymentDues = (data: dataProps) =>
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

export const getPaymentDuesWithoutTripId = (vehicleNumber: string) =>
    prisma.paymentDues.findFirst({
        where: {
            vehicleNumber,
            status: false,
            overallTripId: null
        }
    })

export const updatePaymentDuesWithTripId = (data: any) =>
    prisma.paymentDues.update({
        where: {
            id: data.id
        },
        data: {
            overallTripId: data.overallTripId
        }
    })

export const getDueByOverallTripId = (overallTripId: number) =>
    prisma.paymentDues.findMany({
        where: {
            overallTripId
        },
        select: {
            payableAmount: true
        }
    })
export const updatePaymentNEFTStatus = (dueId: number[]) =>
    prisma.paymentDues.updateMany({
        where: {
            id: {
                in: dueId
            }
        },
        data: {
            NEFTStatus: true
        }
    })
