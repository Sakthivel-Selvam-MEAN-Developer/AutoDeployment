import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'
import tollPlaza from '../seed/tollPlaza.ts'

export const create = (
    data: Prisma.tollPaymentCreateManyInput | Prisma.tollPaymentUncheckedCreateInput[]
) => prisma.tollPayment.createMany({ data })
interface props {
    billNo: string
    billDate: number
}
interface data {
    amount: number
}
export interface tollPlaza {
    id: number
}
export const updateBillDetails = (overallTripIds: number[], data: props) =>
    prisma.tollPayment.updateMany({
        where: {
            overallTripId: { in: overallTripIds }
        },
        data: {
            billNo: data.billNo,
            billDate: data.billDate,
            billedStatus: true
        }
    })
export const updateTollAmount = (ids: number[], data: data) => {
    return prisma.tollPayment.updateMany({
        where: {
            id: { in: ids }
        },
        data: {
            amount: data.amount
        }
    })
}
export const getTollPlaza = () => prisma.tollPayment.findMany({})
export const getTollLocations = () =>
    prisma.tollPlazaLocation.findMany({
        select: {
            id: true,
            location: true
        }
    })
export const createTollPlazaLocations = (
    data: Prisma.tollPlazaLocationCreateInput | Prisma.tollPlazaLocationUncheckedCreateInput
) => prisma.tollPlazaLocation.create({ data })
